const asyncHandler = require("express-async-handler")

const _tagContext = require("../models/tagModel")
const _code = require("../utils/statusCodes")
const _msg = require("../utils/msg")
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//#region Tags
const getAllTags = asyncHandler(async (req, res) => {
    const allTags = await _tagContext.find()
    res.status(_code.ok).json(allTags)
})

const createTag = asyncHandler(async (req, res) => {
    const { name } = req.body
    const createdTag = await _tagContext.create({
        name,
        mediaEmbedded: []
    })
    res.status(_code.created).json(createdTag)
})

const getTag = asyncHandler(async (req, res) => {

    res.status(200).json({ poruka: "U getTag - tagService" })
})

const patchTag = asyncHandler(async (req, res) => {
    res.status(200).json({ poruka: "U patchTag - tagService" })
})

const deleteTag = asyncHandler(async (req, res) => {
    res.status(200).json({ poruka: "U deleteTag - tagService" })
})
//#endregion
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//#region Tags + CustomMedia
const getAllCustomMediaFromTag = asyncHandler(async (req, res) => {
    const tagId = req.params.tagId
    
    const allCustomMediaFromTag = await _tagContext.findOne({ _id: tagId}, { mediaEmbedded: 1, _id: 0})
    res.status(_code.ok).json(allCustomMediaFromTag)
})

const addCustomMediaToTag = asyncHandler(async (req, res) => {
    const tagId = req.params.tagId
    const customMedia = req.body

    console.log(customMedia)
    await _tagContext.updateOne({ _id: tagId}, { $push: { mediaEmbedded: customMedia}})

    res.status(_code.created).json(_msg.addedMediaToTag)
})
//#endregion
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = {
    //Tags
    getAllTags,
    getTag,
    createTag,
    patchTag,
    deleteTag,

    //Tags + CustomMedia
    getAllCustomMediaFromTag,
    addCustomMediaToTag
}