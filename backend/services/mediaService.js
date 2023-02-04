const asyncHandler = require("express-async-handler")

const _mediaContext = require("../models/mediaModel")
const _code = require("../utils/statusCodes")
const _msg = require("../utils/msg")

const getAllMedia = asyncHandler(async (req, res) => {
    if (!req && !res)
        throw new Error(_msg.unknownError)
    res.status(200).json({ poruka: "U mediaService" })
})

module.exports = {
    getAllMedia
}