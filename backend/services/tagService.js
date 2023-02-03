const asyncHandler = require("express-async-handler")
const msg = require("../utils/msg")

const getAllTags = asyncHandler(async (req, res) => {
    throw new Error(msg.unknownError)
    res.status(200).json({ poruka: "U getAllTags - tagService" })
})

const getTag = asyncHandler(async (req, res) => {
    res.status(200).json({ poruka: "U getTag - tagService" })
})

const setTag = asyncHandler(async (req, res) => {
    res.status(200).json({ poruka: "U setTag - tagService" })
})

const updateTag = asyncHandler(async (req, res) => {
    res.status(200).json({ poruka: "U updateTag - tagService" })
})

const patchTag = asyncHandler(async (req, res) => {
    res.status(200).json({ poruka: "U patchTag - tagService" })
})

const deleteTag = asyncHandler(async (req, res) => {
    res.status(200).json({ poruka: "U deleteTag - tagService" })
})

module.exports = {
    getAllTags,
    getTag,
    setTag,
    updateTag,
    patchTag,
    deleteTag
}