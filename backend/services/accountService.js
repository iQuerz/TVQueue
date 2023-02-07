const asyncHandler = require("express-async-handler")

const _accountContext = require("../models/accountModel")

const _code = require("../helpers/statusCodes")
const _msg = require("../helpers/msg")
const _mw = require("../helpers/middlewares")
const _proj = require("../helpers/projections")

const validator = { runValidators: true }
//==============================================================================================================================================//
//#region Accounts

//@GET: "/api/account?skip=_NUM_&limit=_NUM_" 
//@Access: PROTECTED
//@Roles
//@Description: Povlaci sve tagove
const getAllAccounts = asyncHandler( async (req, res) => {
    const skip = parseInt((req.query.skip) ?? 0)
    const limit = parseInt((req.query.limit) ?? 10)
    let allAccountsQuery = _accountContext.find({}, _proj.account.getId_Name_Picture_Roles)

    if (!isNaN(req.query.skip) && req.query.limit)
        allAccountsQuery = allAccountsQuery.skip(skip).limit(limit)

    const allAccounts = await allAccountsQuery.lean()

    res.status(_code.ok).json(allAccounts)
})

//#endregion
//==============================================================================================================================================//

module.exports = {
    getAllAccounts
}