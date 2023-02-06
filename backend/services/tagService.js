const mongoose = require("mongoose")
const asyncHandler = require("express-async-handler")

const _tagContext = require("../models/tagModel")
const _code = require("../helpers/statusCodes")
const _msg = require("../helpers/msg")
const _mw = require("../helpers/middlewares")

const validator = { runValidators: true }
//==============================================================================================================================================//
//#region Tags

//GET: "/api/tags?skip=_NUM_&limit=_NUM_" 
//Description: Povlaci sve tagove
const getAllTags = asyncHandler(async (req, res) => {
    let allTagsQuery = _tagContext.find({}, { _id: 1, name: 1, mediaCount: 1 })

    if (!isNaN(req.query.skip) && req.query.limit) {
        allTagsQuery = allTagsQuery.skip(req.query.skip).limit(req.query.limit)
    }

    const allTags = await allTagsQuery.sort({ "mediaEmbedded": -1 }).lean()

    res.status(_code.ok).json(allTags)
})

//POST: "/api/tags"
//Description: Kreira tag
const createTag = asyncHandler(async (req, res) => {
    const { name } = req.body

    if(!name) _mw.error.send(res, _code.badRequest, _msg.requiredTagName)

    const createdTag = await _tagContext.create({ name })

    res.status(_code.created).json({ _id: createdTag._id, name: createdTag.name })
})

//GET: "/api/tags/:tagId?skip=_NUM_&limit=_NUM_"
//Description: Povlaci tag
const getTag = asyncHandler(async (req, res) => {
    const skip = parseInt((req.query.skip) ?? 0)
    const limit = parseInt((req.query.limit) ?? 10)
    const tagId = req.params.tagId

    const tag = await _tagContext.findById({ _id: tagId }, { _id: 0, mediaEmbedded: { $slice: [skip, limit] }, name: 1, mediaCount: 1}).lean()

    res.status((tag) ? _code.ok : _code.noContent).json(tag)
})

//PATCH: "/api/tags/:tagId"
//Description: Updateuje samo deo prosledjen u body
const patchTag = asyncHandler(async (req, res) => {
    const tagId = req.params.tagId
    
    if(req.body.mediaCount) _mw.error.send(res, _code.forbidden, _msg.forbiddenMediaCount)
    if(req.body.mediaEmbedded.length > 0) _mw.error.send(res, _code.forbidden, _msg.forbiddenMediaEmbedded)

    const updatedTag = await _tagContext.findByIdAndUpdate({ _id: tagId }, req.body)

    res.status((updatedTag) ? _code.ok : _code.noContent).json(_msg.updatedTag)
})

//DELETE: "/api/tags/:tagId"
//Description: Brise tag jelte
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

//GET: "/api/tags/:tagId/media?"
//Description: Povlaci spisak svih media u tag-u
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

//POST: "/api/tags/:tagId/media" 
//Description: Koristi za dodavanje
const addCustomMediaInTag = asyncHandler(async (req, res) => {
    const tagId = req.params.tagId
    const customMedia = req.body

    const exist = await _tagContext.exists({ _id: tagId, "mediaEmbedded._id": customMedia._id})    
    if(exist) _mw.error.send(res, _code.badRequest, _msg.existCustomMediaInTag)

    const result = await _tagContext.updateOne({ _id: tagId }, { $push: { mediaEmbedded: customMedia}, $inc: { mediaCount: 1 }}, validator)
    
    if (result.modifiedCount === 0)
        _mw.error.send(res, _code.noContent, "")
 
    res.status(_code.created).json(_msg.addedMediaToTag)
})

//PATCH: "/api/tags/:tagId/media/:mediaId" 
//Description: Koristi za updatovanje
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

//DELETE: "/api/tags/:tagId/media/:mediaId" 
//Description: Koristi za brisanje
const deleteCustomMediaInTag = asyncHandler(async (req, res) => {
    const { tagId, mediaId } = req.params

    const exist = await _tagContext.exists({ _id: tagId, "mediaEmbedded._id": mediaId})
    if(!exist) _mw.error.send(res, _code.notFound, _msg.mediaInTagNotFound)

    await _tagContext.updateOne({ _id: tagId }, { $pull: { mediaEmbedded: { _id: mediaId }}, $inc: { mediaCount: -1 }})

    res.status(_code.ok).json(_msg.deletedMediaInTag)
})

//#endregion
//==============================================================================================================================================//
//#region Alias middleware

//MIDDLEWARE: "/top-_num_text_-tags"
//Description: Vrati top tagove "five" - "ten" - "fifteen"
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

    //Alias
    aliasTopTags
}