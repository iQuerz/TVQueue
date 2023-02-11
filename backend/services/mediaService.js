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
const _security = require("../configs/security")

//==============================================================================================================================================//
//#region Media

//@GET: "/api/accounts?skip=_NUM_&limit=_NUM_&name=_TXT_&email=_TXT_&roles=admin&roles=user...""
//@Access: PROTECTED
//@Roles: ADMIN
//@Description: Povlaci sve account-ove
// const getAllMedia = asyncHandler( async (req, res) => {

//     // const skip = parseInt((req.query.skip) ?? 0)
//     // const limit = parseInt((req.query.limit) ?? 10)

//     // const obj = _obj.filter(req.query, "name", "email", "roles")
//     // let query = (obj.name || obj.email) ? {"$or": []} : {}

//     // if (obj.name) query["$or"].push({"name": {$regex: obj.name, $options: "i"}})
//     // if (obj.email) query["$or"].push({"email": {$regex: obj.email, $options: "i"}})

//     // if(obj.roles) {
//     //     if(!(obj.roles instanceof Array)) obj.roles = [obj.roles]

//     //     query["$and"]  = obj.roles.filter(roleValid => _enum.roles.type[roleValid.toLowerCase()]).map(role => ({ [`roles.${[role.toLowerCase()]}`]: true  }) )
        
//     //     if(query["$or"]) query = { "$and": [ {$or: query["$or"]}, {$and: query["$and"]} ] }
//     // }
//     // console.log(query)
//     // const allAccountsQuery = await _accountContext.find(query, _obj.one.Id.Email.Name.Picture.Roles.FollowingTags.result).skip(skip).limit(limit).lean()

//     res.status(_code.ok).json(_msg.success)
// })

//@POST: "/api/media" 
//@Access: PROTECTED
//@Roles: ADMIN
//@Description: Koristi se za kreiranje media
const createMedia = asyncHandler(async (req, res) => {
    const media = _obj.filter(req.body, "name", "type", "picture", "description", "airedDate", "parent", "participated", "tags")

    media._id = mongoose.Types.ObjectId();

    const createdMedia = await _mediaContext.create(media)

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

//@GET: "/api/accounts/:mediaId?skip=_NUM_&limit=_NUM_"
//@Access: PUBLIC
//@Roles: ALL
//@Description: Povlaci media
const getMedia = asyncHandler(async (req, res) => {
    const mediaId = req.params.mediaId
    const skip = parseInt((req.query.skip) ?? 0)
    const limit = parseInt((req.query.limit) ?? 10)

    const includeFields = _obj.one.Name.Type.Picture.Description.AiredDate.Rating.Parent.Reviews(skip, limit).Participated().Tags().Episodes().result
    const media = await _mediaContext.findOne({ _id: mediaId }, includeFields ).lean()

    res.status((media) ? _code.ok : _code.noContent).json(media)
})

// //@PATCH: "/api/accounts/:accountId"
// //@Access: PROTECTED
// //@Roles: ADMIN
// //@Description: Updateuje samo deo prosledjen u body
// const patchAccount = asyncHandler(async (req, res) => {
//     const accountId = req.params.accountId

//     if(req.body.playlists) throw new Error(_msg.forbiddenPlaylist)
//     if(req.body.reviews) throw new Error(_msg.forbiddenReviews)
//     if(req.body.followingTags) throw new Error(_msg.forbiddenFollowingTags)
 
//     const updatedAccount = await _accountContext.findByIdAndUpdate({ _id: accountId }, req.body, { new: true })
    
//     res.status((updatedAccount) ? _code.ok : _code.noContent).json(_msg.updatedAccount)
// })

// //@DELETE: "/api/accounts/:accountId"
// //@Access: PROTECTED
// //@Roles: ADMIN
// //@Description: Brise account
// const deleteAccount = asyncHandler(async (req, res) => {
//     const accountId = req.params.accountId

//     const exist = await _accountContext.exists({ _id: accountId })
//     if(!exist) _mw.error.send(res, _code.notFound, _msg.accountNotFound)

//     const deletedAccount = await _accountContext.findByIdAndDelete({ _id: accountId })
    
//     res.status((deletedAccount) ? _code.ok : _code.noContent).json(_msg.deletedAccount)
// })


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
    review.userId = req.myAccount._id
    review.name = req.myAccount.name

    console.log(review)
    if (!review.userId) _mw.send(res, _code.forbidden, _msg.notLoggedIn)

    const addedReview = await _mediaContext.findOneAndUpdate({ 
        _id: mediaId,
        "reviews._userId": { $nin: [review.userId] }
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
            reviewCount: 1
        },
        new: true
    })
    addedReview.rating = 0.93
    addedReview.avgRating = 1000
    addedReview.save()
    console.log(addedReview)
    res.status((addedReview) ? _code.ok : _code.badRequest).json(_msg.success)
})

// //@DELETE: "/api/accounts/_ACCOUNT_ID_/tags" 
// //@Access: PROTECTED
// //@Roles: ADMIN
// //@Description: Brise listu tagova [tags] u account
// const removeFollowingTags = asyncHandler( async (req, res) => {
//     const accountId = req.params.accountId
//     const removeTags = req.body

//     const removedTags = await _accountContext.findOneAndUpdate({ _id: accountId }, { $pull: { "followingTags": { _id: { $in: removeTags }}}}, { new: true })

//     res.status((removedTags) ? _code.ok : _code.badRequest).json(removedTags ?? _msg.accountTagsNotFound)
// })

// //@PATCH: "/api/accounts/_ACCOUNT_ID_/tags" 
// //@Access: PROTECTED
// //@Roles: ADMIN
// //@Description: Koristi se za updatovanje taga kad se update-uje sam tag dokument
// const updateFollowingTag = asyncHandler(async (req, res) => {
//     const accountId = req.params.accountId
//     const tag = req.body

//     if (!tag._id || !tag.name) _mw.error.send(res, _code.badRequest, _msg.wrongIdNameTag)

//     const result = await _accountContext.updateOne({ _id: accountId, "followingTags._id": tag._id }, { $set: { "followingTags.$.name": tag.name }})
    
//     if (result.modifiedCount === 0) _mw.error.send(res, _code.notFound, _msg.updatedAccountTagFailed)

//     res.status(_code.ok).json(_msg.updatedAccountTag)
// })
//#endregion
//==============================================================================================================================================//
//#region Media + Episodes

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

//#endregion
//==============================================================================================================================================//
//#region Tags + CustomMedia

module.exports = {
    //Media
    // getAllMedia,
    getMedia,
    createMedia,

    //Media + Parent
    connectChildToParent,

    //Meda + Reviews
    addReview,

    //Media + Tags
    connectMediaToTags
    
}