const asyncHandler = require("express-async-handler")

const _mediaContext = require("../models/mediaModel")

const _code = require("../helpers/statusCodes")
const _msg = require("../helpers/msg")

const getAllMedia = asyncHandler(async (req, res) => {
    if (!req && !res)
        throw new Error(_msg.unknownError)
    res.status(200).json({ poruka: "U mediaService" })
})

module.exports = {
    getAllMedia
}