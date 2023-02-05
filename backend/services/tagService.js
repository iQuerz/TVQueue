const mongoose = require("mongoose")
const asyncHandler = require("express-async-handler")

const _tagContext = require("../models/tagModel")
const _code = require("../helpers/statusCodes")
const _msg = require("../helpers/msg")
const _mw = require("../helpers/middlewares")

//==============================================================================================================================================//
//#region Tags

//GET: "/api/tags?skip=_NUM_&limit=_NUM_" 
//Description: Povlaci sve tagove
const getAllTags = asyncHandler(async (req, res) => {
    let allTagsQuery = _tagContext.find({}, { mediaEmbedded: 0})

    if (req.query.skip && req.query.limit)
        allTagsQuery = allTagsQuery.skip(req.query.skip).limit(req.query.limit)

    const allTags = await allTagsQuery.sort({ "mediaEmbedded": -1}).lean()

    res.status(_code.ok).json(allTags)
})

//POST: "/api/tags"
//Description: Kreira tag
const createTag = asyncHandler(async (req, res) => {
    const { name } = req.body

    if(!name) _mw.error.send(res, _code.badRequest, _msg.requiredName)

    const createdTag = await _tagContext.create({ name })

    res.status(_code.created).json(createdTag)
})

//GET: "/api/tags/:tagId?skip=_NUM_&limit=_NUM_"
//Description: Povlaci tagove
const getTag = asyncHandler(async (req, res) => {
    const skip = parseInt((req.query.skip) ?? 0)
    const limit = parseInt((req.query.limit) ?? 10)
    const tagId = req.params.tagId

    const tag = await _tagContext.findById({ _id: tagId }, { _id: 0, mediaEmbedded: { $slice: [skip, limit] }, name: 1}).lean()

    res.status((tag) ? _code.ok : _code.noContent).json(tag)
})

//PATCH: "/api/tags/:tagId"
//Description: Updateuje samo deo prosledjen u body
const patchTag = asyncHandler(async (req, res) => {
    const tagId = req.params.tagId
    
    const updatedTag = await _tagContext.findByIdAndUpdate({ _id: tagId }, req.body)

    res.status((updatedTag) ? _code.ok : _code.noContent).json(_msg.updatedTag)
})

//DELETE: "/api/tags/:tagId"
//Description: Brise tag jelte
const deleteTag = asyncHandler(async (req, res) => {
    const tagId = req.params.tagId

    const deletedTag = await _tagContext.findByIdAndDelete({ _id: tagId })
    
    res.status((deletedTag) ? _code.ok : _code.noContent).json(_msg.deletedTag)
})
//#endregion
//==============================================================================================================================================//
//#region Tags + CustomMedia

//GET: "/api/tags/:tagId/media"
//Description: Povlaci spisak svih media u tag-u
const getAllCustomMediaInTag = asyncHandler(async (req, res) => {
    const tagId = req.params.tagId
    
    const { mediaEmbedded} = await _tagContext.findOne({ _id: tagId }, { mediaEmbedded: 1, _id: 0}).lean();

    res.status((mediaEmbedded.length) ? _code.ok : _code.noContent).json(mediaEmbedded)
})

//POST: "/api/tags/:tagId/media" 
//Description: Koristi za dodavanje
const addCustomMediaInTag = asyncHandler(async (req, res) => {
    const tagId = req.params.tagId
    const customMedia = req.body

    await _tagContext.updateOne({ _id: tagId}, { $push: { mediaEmbedded: customMedia}})

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

    await _tagContext.updateOne({ _id: tagId, "mediaEmbedded._id": customMedia._id}, { $set: objQuery})
    res.status(_code.created).json(_msg.updatedMediaInTag)
})

//DELETE: "/api/tags/:tagId/media/:mediaId" 
//Description: Koristi za brisanje
const deleteCustomMediaInTag = asyncHandler(async (req, res) => {
    const { tagId, mediaId } = req.params

    await _tagContext.updateOne({ _id: tagId }, { $pull: { mediaEmbedded: { _id: mediaId }}})

    res.status(_code.created).json(_msg.deletedMediaInTag)
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
    getAllCustomMediaInTag,
    addCustomMediaInTag,
    updateCustomMediaInTag,
    deleteCustomMediaInTag
}