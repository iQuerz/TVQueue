const asyncHandler = require("express-async-handler")
const msg = require("../utils/msg")

const getAllAccounts = (req, res) => {
    res.json({ poruka: "U accountService" })
}

module.exports = {
    getAllAccounts
}