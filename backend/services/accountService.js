const asyncHandler = require("express-async-handler")

const _accountService = require("../models/accountModel")
const _code = require("../helpers/statusCodes")
const _msg = require("../helpers/msg")

const getAllAccounts = asyncHandler( async (req, res) => {
    if (!req && !res)
        throw new Error(_msg.unknownError)
    res.json({ poruka: "U accountService" })
})

module.exports = {
    getAllAccounts
}