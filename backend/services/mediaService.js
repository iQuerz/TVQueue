const mongoose = require("mongoose")
const asyncHandler = require("express-async-handler")

const _tagContext = require("../models/tagModel")
const _accountContext = require("../models/accountModel")
const _mediaContext = require("../models/mediaModel")

const _code = require("../helpers/statusCodes")
const _msg = require("../helpers/msg")
const _mw = require("../helpers/middlewares")
const _obj = require("../helpers/projections")
const _enum = require("../helpers/enums")
const _util = require("../helpers/utility")


//==============================================================================================================================================//
//#region Media

//@GET: "/api/media?skip=_NUM_&limit=_NUM_&name=_TXT_&type=_ENUM_&sort=_RATING_OR_DATE_"
//@Access: PROTECTED
//@Roles: ADMIN
//@Description: Povlaci sve account-ove  
const getAllMedia = asyncHandler( async (req, res) => {
    let { type, name, fromDate, toDate, order, skip, limit, sort} = req.query

    let query = {}
    
    if (name) query.searchName = {$regex: "^"+name.toLowerCase()}
    if (type) query.type = _enum.media.type[type]

    fromDate = (fromDate) ? new Date(fromDate) : new Date("1900")
    toDate = (toDate) ? new Date(toDate) : new Date("2100")
    query["$and"] = [{ "airedDate": {"$gte": fromDate}}, { "airedDate": {"$lte": toDate}}]

    order = parseInt((order === "asc") ? 1 : -1)
    skip = parseInt((skip) ?? 0)
    limit = parseInt((limit) ?? 10)
    
    sort = { [((sort) ?? "airedDate")]: order}

    const result = await _mediaContext.find(query, _obj.one.Id.Name.Picture.Type.AiredDate.Rating.result).sort(sort).skip(skip).limit(limit).lean()

    res.status(_code.ok).json(result)
})

//@POST: "/api/media" 
//@Access: PROTECTED
//@Roles: ADMIN
//@Description: Koristi se za kreiranje media
const createMedia = asyncHandler(async (req, res) => {
    const media = _obj.filter(req.body, "name", "type", "picture", "description", "airedDate", "parent", "participated", "tags")

    media._id = mongoose.Types.ObjectId();

    const createdMedia = await _mediaContext.create(media)
    console.log(createdMedia.tags)
    if(media.parent) {
        req.params.parentId = media.parent._id

        req.params.child = {
            name: media.name, 
            _id: media._id, 
            seasonEpisode: media.parent.seasonEpisode
        }

        await connectChildToParent(req, res)
    }

    if(media.tags) {
        req.params.tagIds = media.tags.map(el => mongoose.Types.ObjectId(el._id))
        media.rating = 0
        req.params.media = media

        await connectMediaToTags(req, res)
    }
    

    res.status(_code.created).json(media)
})

//@GET: "/api/media/:mediaId"
//@Access: PUBLIC
//@Roles: ALL
//@Description: Povlaci media
const getMedia = asyncHandler(async (req, res) => {
    const mediaId = req.params.mediaId
    const skip = parseInt((req.query.skip) ?? 0)
    const limit = parseInt((req.query.limit) ?? 10)

    const media = await _mediaContext.findOne({ _id: mediaId }, {} ).lean()

    res.status((media) ? _code.ok : _code.noContent).json(media)
})

//@DELETE: "/api/media/:mediaId" 
//@Access: PROTECTED
//@Roles: ADMIN
//@Description: Koristi se za kreiranje media
const deleteMedia = asyncHandler(async (req, res) => {
    const mediaId = req.params.mediaId
    //hesus, this what we get for using "embedded" type
    const removedMedia = await _mediaContext.findOneAndDelete({ _id: mediaId })

    if (removedMedia.parent) await _mediaContext.updateOne({ _id: removedMedia.parent._id}, { $pull: { "episodes": { _id: mediaId } } })
    if (removedMedia.tags?.length > 0) bulkWriteTags(mediaId, removedMedia.tags)
    if (removedMedia.reviews?.length > 0) bulkWriteReviews(mediaId, removedMedia.reviews)
    if (removedMedia.episodes?.length > 0) bulkWriteEpisodes(mediaId, removedMedia.episodes)

    res.status(_code.noContent).json(removedMedia)
})

// @PATCH: "/api/media/:mediaId"
// @Access: PROTECTED
// @Roles: ADMIN
// @Description: Updateuje samo deo prosledjen u body
const patchMedia = asyncHandler(async (req, res) => {
    const mediaId = req.params.mediaId
    const patch = req.body

    if(patch.participated || patch.reviews || patch.episodes || patch.tags ) 
        throw new Error(_msg.forbidden)

    const oldMedia = await _mediaContext.findOneAndUpdate({ _id: mediaId }, req.body)
    
    console.log(patch)
    console.log(oldMedia)

    if (patch.parent) {
        const child = {
            name: patch.parent.name ?? oldMedia.parent.name ,
            _id: mediaId, 
            seasonEpisode: patch.parent.seasonEpisode ?? oldMedia.parent.seasonEpisode
        }
        await _mediaContext.updateOne({ _id: patch.parent._id}, { $push: { "episodes": child } })
        await _mediaContext.updateOne({ _id: oldMedia.parent._id}, { $pull: { "episodes": { _id: mediaId } } })
    }
    res.status((oldMedia) ? _code.ok : _code.noContent).json(_msg.success)
})


//#endregion
//==============================================================================================================================================//
//#region Media + Parent

// @HELPER:
// @Access: PROTECTED
// @Roles: ADMIN
// @Description: Povezuje epizodu sa serijom (ili sta god vec)
const connectChildToParent = asyncHandler(async (req, res) => {
    const parentId = req.params.parentId
    const child = req.params.child

    if (!parentId || !child) return

    const result = await _mediaContext.updateOne({ _id: parentId}, { $push: { episodes: child }})

    if (result.modifiedCount === 0)
        _mw.error.send(res, _code.noContent, _msg.mediaToTagFail)
 
    return _msg.parentUpdated   
})

//#endregion
//==============================================================================================================================================//
//#region Media + Participated

//#endregion
//==============================================================================================================================================//
//#region Media + Reviews

//@POST: "/api/media/_MEDIA_ID_/reviews" 
//@Access: PROTECTED
//@Roles: ADMIN
//@Description: Dodaje listu tagova [tags] u account
const addReview = asyncHandler( async (req, res) => {
    const mediaId = req.params.mediaId
    const review = _obj.filter(req.body, "rating", "comment")
    review._userId = [req.myAccount._id]
    review.name = req.myAccount.name

    if (!review._userId) _mw.error.send(res, _code.forbidden, _msg.notLoggedIn)

    const media = await _mediaContext.findOneAndUpdate({ 
        _id: mediaId,
        "reviews._userId": { $nin: review._userId }
    },
    { 
        $push: { reviews: review },
        "$inc": { "reviewCount": 1 } 
    }, 
    {   
        projection: {
            _id: 1,
            rating: 1,
            avgRating: 1,
            reviewCount: 1,
            tags: 1
        },
        new: true
    })
    //Tag update
    if (!media) throw _mw.error.send(res, _code.badRequest, _msg.failed)

    media.avgRating = _util.average(media.avgRating, media.reviewCount, review.rating)
    media.rating = _util.trendiness(media.avgRating, media.reviewCount)
    media.save()

    req.params.tagId = media.tags
    req.body.rating = media.rating
    const tagIds = media.tags.map(e => mongoose.Types.ObjectId(e._id))
    
    await _tagContext.updateMany({ _id: { $in: tagIds }, "mediaEmbedded._id": media._id}, { $set: { "mediaEmbedded.$.rating": media.rating}})
    
    //Account update
    await _accountContext.findByIdAndUpdate({ _id: review._userId }, { $push: { "reviews": { rating: review.rating, comment: review.comment, _mediaId: mediaId } }})
    res.status(_code.ok).json(_msg.success)

})

//@DELETE: "/api/media/_MEDIA_ID_/reviews" 
//@Access: PROTECTED
//@Roles: ADMIN
//@Description: Dodaje listu tagova [tags] u account
const deleteReview = asyncHandler( async (req, res) => {
    const mediaId = req.params.mediaId
    const userId = [req.myAccount._id]

    const media = await _mediaContext.findOneAndUpdate({ 
        _id: mediaId,
        "reviews._userId": { $in: userId }
    },
    { 
        $pull: { reviews: { _userId: userId} },
        "$inc": { "reviewCount": -1 } 
    }, 
    {   
        projection: {
            _id: 1,
            rating: 1,
            avgRating: 1,
            reviewCount: 1,
            tags: 1,
            reviews: { 
                $elemMatch: { _userId: userId}
            }
        },
    })
    //Tag update
    if (!media) throw _mw.error.send(res, _code.badRequest, _msg.failed)

    media.avgRating = _util.average(media.avgRating, media.reviewCount, (-media.reviews[0].rating))
    media.rating = _util.trendiness(media.avgRating, media.reviewCount)

    media.save()

    req.params.tagId = media.tags
    req.body.rating = media.rating
    const tagIds = media.tags.map(e => mongoose.Types.ObjectId(e._id))
    
    await _tagContext.updateMany({ _id: { $in: tagIds }, "mediaEmbedded._id": media._id}, { $set: { "mediaEmbedded.$.rating": media.rating}})
    
    //Account update
    await _accountContext.findByIdAndUpdate({ _id: userId }, { $pull: { "reviews": { _mediaId: mediaId } }})
    res.status(_code.ok).json(media)

})

const bulkWriteReviews = asyncHandler(async (mediaId, reviews) => {
        const bulkOperation = reviews.map(account => { 
        console.log(account)
        return { "updateOne" : { "filter" : { "_id" : account._userId }, "update" : { "$pull" : { "reviews": { _mediaId: mediaId } } } } }
    })
    await _accountContext.bulkWrite(bulkOperation)
    return
})

//#endregion
//==============================================================================================================================================//
//#region Media + Episodes


// @HELPER:
// @Access: PROTECTED
// @Roles: ADMIN
// @Description: Povezuje media sa tagovima (ili sta god vec)
const bulkWriteEpisodes = asyncHandler(async (mediaId, episodes) => {
    const bulkOperation = episodes.map(episode => { 
        return { "updateOne" : { "filter" : { "_id" : episode._id }, "update" : { "$unset" : { "parent": { _id: mediaId } } } } }
    })
    await _mediaContext.bulkWrite(bulkOperation)
    return
})

//#endregion
//==============================================================================================================================================//
//#region Media + Tags

// @HELPER:
// @Access: PROTECTED
// @Roles: ADMIN
// @Description: Povezuje media sa tagovima (ili sta god vec)
const connectMediaToTags = asyncHandler(async (req, res) => {
    const media = req.params.media
    const tagIds = req.params.tagIds

    if (!media || !tagIds) return

    const customMedia = _obj.filter(media, "_id", "name", "type", "picture", "rating", "airedDate")

    const bulkOperation = tagIds.map(tagId => { 
        return { "updateOne" : { "filter" : { "_id" : tagId }, "update" : { "$push" : { "mediaEmbedded": customMedia }, "$inc": { "mediaCount": 1 } } } }
    })

    const result = await _tagContext.bulkWrite(bulkOperation)
 
    return _msg.addedMediaToTag
})

const bulkWriteTags = asyncHandler(async (mediaId, tags) => {
    const bulkOperation = tags.map(tag => { 
        return { "updateOne" : { "filter" : { "_id" : tag._id }, "update" : { "$pull" : { "mediaEmbedded": {_id: mediaId} }, "$inc": { "mediaCount": -1 } } } }
    })
    await _tagContext.bulkWrite(bulkOperation)
})

//#endregion
//==============================================================================================================================================//
//#region Tags + CustomMedia

module.exports = {
    //Media
    getAllMedia,
    getMedia,
    createMedia,
    patchMedia,
    deleteMedia,

    //Media + Parent
    connectChildToParent,

    //Meda + Reviews
    addReview,
    deleteReview,

    //Media + Tags
    connectMediaToTags
    
}