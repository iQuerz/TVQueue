const asyncHandler = require("express-async-handler")
const msg = require("../utils/msg")

const getAllMedia = (req, res) => {
    res.json({ poruka: "U mediaService" })
}

module.exports = {
    getAllMedia
}