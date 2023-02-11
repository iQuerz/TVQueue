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

const validator = { runValidators: true }
//==============================================================================================================================================//
//#region Tags

//@GET: "/api/tags?skip=_NUM_&limit=_NUM_&name=_TXT_" 
//@Access: PUBLIC
//@Roles
//@Description: Povlaci sve tagove
const getAllTags = asyncHandler(async (req, res) => {
    const type = req.params.static ?? {}
    const obj = (req.query.name) ? { name: new RegExp("^" + req.query.name?.replace("+", " ") + "$", "i") } : type

    const skip = parseInt((req.query.skip) ?? 0)
    const limit = parseInt((req.query.limit) ?? 10)

    let allTagsQuery = _tagContext.find(obj, _obj.one.Id.Name.MediaCount.result)

    if (!isNaN(req.query.skip) && !isNaN(req.query.limit)) {
        allTagsQuery = allTagsQuery.skip(skip).limit(limit)
    }

    const allTags = await allTagsQuery.sort({ mediaCount: -1 }).lean()

    res.status(_code.ok).json(allTags)
})

//@POST: "/api/tags"
//@Access: PUBLIC
//@Roles
//@Description: Kreira tag
const createTag = asyncHandler(async (req, res) => {
    const { name } = req.body

    if(!name) _mw.error.send(res, _code.badRequest, _msg.requiredTagName)

    const createdTag = await _tagContext.create({ name })

    res.status(_code.created).json({ _id: createdTag._id, name: createdTag.name })
})

//@GET: "/api/tags/:tagId?skip=_NUM_&limit=_NUM_"
//@Access: PUBLIC
//@Roles
//@Description: Povlaci tag
const getTag = asyncHandler(async (req, res) => {
    const skip = parseInt((req.query.skip) ?? 0)
    const limit = parseInt((req.query.limit) ?? 10)
    const tagId = req.params.tagId

    const tag = await _tagContext.findById({ _id: tagId }, _obj.one.Name.MediaCount.MediaEmbedded(skip, limit).result).lean()

    res.status((tag) ? _code.ok : _code.noContent).json(tag)
})

//@PATCH: "/api/tags/:tagId"
//@Access: PUBLIC
//@Roles
//@Description: Updateuje samo deo prosledjen u body
const patchTag = asyncHandler(async (req, res) => {
    const tagId = req.params.tagId
    
    if(req.body.mediaCount) _mw.error.send(res, _code.forbidden, _msg.forbiddenMediaCount)
    if(req.body.mediaEmbedded?.length > 0) _mw.error.send(res, _code.forbidden, _msg.forbiddenMediaEmbedded)

    const updatedTag = await _tagContext.findByIdAndUpdate({ _id: tagId }, req.body, { new: true })

    //Ne dao bog da mora da se update-uje naziv taga, nz kako bi neko prejebao to
    if(req.body.name) await _accountContext.updateMany({"followingTags._id": updatedTag._id}, { $set: { "followingTags.$.name": updatedTag.name }})
    
    res.status((updatedTag) ? _code.ok : _code.noContent).json(_msg.updatedTag)
})

//@DELETE: "/api/tags/:tagId"
//@Access: PUBLIC
//@Roles
//@Description: Brise tag jelte
const deleteTag = asyncHandler(async (req, res) => {
    const tagId = req.params.tagId

    const exist = await _tagContext.exists({ _id: tagId })
    if(!exist) _mw.error.send(res, _code.notFound, _msg.tagNotFound)

    const deletedTag = await _tagContext.findByIdAndDelete({ _id: tagId })
    
    res.status((deletedTag) ? _code.ok : _code.noContent).json(_msg.deletedTag)
})

//#endregion
//==============================================================================================================================================//
//#region Tags + CustomMedia

//@GET: "/api/tags/:tagId/media?"
//@Access: PUBLIC
//@Roles
//@Description: Povlaci spisak svih media u tag-u
const filterCustomMediaInTag = asyncHandler(async (req, res) => {
    const tagId = new mongoose.Types.ObjectId(req.params.tagId)
    let { type, name, fromDate, toDate, order, skip, limit} = req.query

    //Query setup
    let objQuery = { "$and": []}

    if(type) objQuery["$and"].push({ $eq: ["$$media.type", type] })
    if(name) objQuery["$and"].push({ $regexMatch: { input: "$$media.name", regex: name, options: "i" } })

    fromDate = (fromDate) ? new Date(fromDate) : new Date("1900")
    toDate = (toDate) ? new Date(toDate) : new Date("2100")
    objQuery["$and"].push({ $and: [{ $gte: ["$$media.airedDate", fromDate]}, { $lte: ["$$media.airedDate", toDate]}] })

    order = parseInt((order === "asc") ? 1 : -1)
    skip = parseInt((skip) ?? 0)
    limit = parseInt((limit) ?? 10)

    const mediaList = (await _tagContext.aggregate([
        { $match: { 
            _id: tagId,
        }},
        { $project: {
            _id: 0,
            mediaCount: 1,
            mediaEmbedded: { 
                $filter: {
                    input: "$mediaEmbedded",
                    as: "media",
                    cond: objQuery
                }            
            }
        }},
        { $project: {
            _id: 0,
            mediaCount: 1,
            mediaEmbedded: { 
                $sortArray: {
                    input: "$mediaEmbedded",
                    sortBy: { rating: order }
                    }
                }
            }
        },
        { $project: {
            _id: 0,
            mediaCount: 1,
            mediaEmbedded: { $slice: ["$mediaEmbedded", skip, limit] }
            }
        },
    ], 
    { $limit: 1 }    
    ))[0]

    res.status((mediaList.mediaEmbedded.length) ? _code.ok : _code.noContent).json(mediaList)
})

//@POST: "/api/tags/:tagId/media" 
//@Access: PUBLIC
//@Roles
//@Description: Koristi za dodavanje media u tagu
const addCustomMediaInTag = asyncHandler(async (req, res) => {
    const tagId = req.params.tagId
    const customMedia = req.body

    const exist = await _tagContext.exists({ _id: tagId, "mediaEmbedded._id": customMedia._id})    
    if(exist) _mw.error.send(res, _code.badRequest, _msg.existCustomMediaInTag)
    console.log(exist)

    const result = await _tagContext.findOneAndUpdate({ _id: tagId }, { $push: { mediaEmbedded: customMedia}, $inc: { mediaCount: 1 }}, { runValidators: true, select: "_id name"})
    
    if (!result)
        _mw.error.send(res, _code.noContent, _msg.mediaToTagFail)

    await _mediaContext.updateOne({ _id: customMedia._id }, { $push: { tags: { _id: result._id, name: result.name }}})

 
    res.status(_code.created).json(_msg.addedMediaToTag)
})

//@PATCH: "/api/tags/:tagId/media/:mediaId" 
//@Access: PUBLIC
//@Roles
//@Description: Koristi za updatovanje media u tagu
const updateCustomMediaInTag = asyncHandler(async (req, res) => {
    const tagId = req.params.tagId
    const customMedia = req.body
 
    let objQuery = {}

    customMedia._id = req.params.mediaId
    if (customMedia.name) objQuery["mediaEmbedded.$.name"] = customMedia.name
    if (customMedia.type) objQuery["mediaEmbedded.$.type"] = customMedia.type
    if (customMedia.picture) objQuery["mediaEmbedded.$.picture"] = customMedia.picture
    if (customMedia.rating) objQuery["mediaEmbedded.$.rating"] = customMedia.rating
    if (customMedia.airedDate) objQuery["mediaEmbedded.$.airedDate"] = customMedia.airedDate

    const result = await _tagContext.updateOne({ _id: tagId, "mediaEmbedded._id": customMedia._id}, { $set: objQuery}, validator)

    if (result.modifiedCount === 0)
        _mw.error.send(res, _code.notFound, _msg.mediaInTagNotFound)

    res.status(_code.ok).json(_msg.updatedMediaInTag)
})

//@DELETE: "/api/tags/:tagId/media/:mediaId" 
//@Access: PUBLIC
//@Roles
//@Description: Koristi za brisanje media u tagu
const deleteCustomMediaInTag = asyncHandler(async (req, res) => {
    const { tagId, mediaId } = req.params

    const exist = await _tagContext.exists({ _id: tagId, "mediaEmbedded._id": mediaId})
    if(!exist) _mw.error.send(res, _code.notFound, _msg.mediaInTagNotFound)

    await _tagContext.updateOne({ _id: tagId }, { $pull: { mediaEmbedded: { _id: mediaId }}, $inc: { mediaCount: -1 }})
    await _mediaContext.updateOne({ _id: mediaId }, { $pull: { tags: { _id: tagId }}})

    res.status(_code.ok).json(_msg.deletedMediaInTag)
})

//#endregion
//==============================================================================================================================================//
//#region Tags Alias

//@MIDDLEWARE: "/top-_num_text_-tags"
//@Access: PUBLIC
//@Roles
//@Description: Vrati top tagove "five" - "ten" - "fifteen"
const aliasTopTags = asyncHandler(async (req, res, next) => {
    switch(req.params.num_text) {
        case "five":
            req.query.limit = 5
            break
        
        case "ten":
            req.query.limit = 10
            break
        
        case "fifteen":
            req.query.limit = 15
            break
    
        default:
            _mw.error.send(res, _code.forbidden, _msg.wrongUrl)
    }
    req.query.skip = 0
    next()
})

//@MIDDLEWARE: "/static"
//@Access: PUBLIC
//@Roles
//@Description: Vrati top tagove "five" - "ten" - "fifteen"
const aliasStaticTags = asyncHandler(async (req, res, next) => {
    req.params.static = { name: {$in: _enum.toKeyList(_enum.staticTags)} }
    next()
})

//@MIDDLEWARE: "/genres"
//@Access: PUBLIC
//@Roles
//@Description: Vrati top tagove "five" - "ten" - "fifteen"
const aliasGenreTags = asyncHandler(async (req, res, next) => {
    req.params.static = { name: {$nin: _enum.toKeyList(_enum.staticTags)} }
    next()
})

//#endregion
//==============================================================================================================================================//

module.exports = {
    //Tags
    getAllTags,
    getTag,
    createTag,
    patchTag,
    deleteTag,

    //Tags + CustomMedia
    filterCustomMediaInTag,
    addCustomMediaInTag,
    updateCustomMediaInTag,
    deleteCustomMediaInTag,

    //Tags Alias
    aliasTopTags,
    aliasStaticTags,
    aliasGenreTags
}