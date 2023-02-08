const asyncHandler = require("express-async-handler")

const _accountContext = require("../models/accountModel")

const _code = require("../helpers/statusCodes")
const _msg = require("../helpers/msg")
const _mw = require("../helpers/middlewares")
const _obj = require("../helpers/projections")
const _security = require("../configs/security")
const { update } = require("../models/accountModel")

const validator = { runValidators: true }
//==============================================================================================================================================//
//#region Accounts

//@GET: "/api/account?skip=_NUM_&limit=_NUM_" 
//@Access: PROTECTED
//@Roles: ADMIN
//@Description: Povlaci sve account-ove
const getAllAccounts = asyncHandler( async (req, res) => {
    const skip = parseInt((req.query.skip) ?? 0)
    const limit = parseInt((req.query.limit) ?? 10)
    
    let allAccountsQuery = _accountContext.find({}, _obj.one.Id.Name.Picture.Roles.FollowingTags.result)

    if (!isNaN(req.query.skip) && req.query.limit)
        allAccountsQuery = allAccountsQuery.skip(skip).limit(limit)

    const allAccounts = await allAccountsQuery.populate("followingTags", "name").lean()

    res.status(_code.ok).json(allAccounts)
})

//@POST: "/api/account" 
//@Access: PROTECTED
//@Roles: ADMIN
//@Description: Koristi se za kreiranje fake naloga (actor i director)
const createAccount = asyncHandler(async (req, res) => {
    const account = _obj.filterBody(req.body, "name", "picture", "roles")
    account.email = `${Number(new Date).toString(36).slice(-6)}@email.com`
    account.password = Number(new Date).toString(35).slice(-5);

    const createdAccount = await _accountContext.create(account)

    res.status(_code.created).json(account)
})

//@GET: "/api/account/:accountId"
//@Access: PUBLIC
//@Roles: ALL
//@Description: Povlaci account
const getAccount = asyncHandler(async (req, res) => {
    const accountId = req.params.accountId

    const account = await _accountContext.findById({ _id: accountId }, _obj.one.Id.Name.Email.Picture.FollowingTags.result).populate("followingTags", "name").lean()

    res.status((account) ? _code.ok : _code.noContent).json(account)
})

//@PATCH: "/api/accounts/:accountId"
//@Access: PROTECTED
//@Roles: ADMIN
//@Description: Updateuje samo deo prosledjen u body
const patchAccount = asyncHandler(async (req, res) => {
    const accountId = req.params.accountId
 
    const updatedAccount = await _accountContext.findByIdAndUpdate({ _id: accountId }, req.body)

    res.status((updatedAccount) ? _code.ok : _code.noContent).json(_msg.updatedAccount)
})

//@DELETE: "/api/accounts/:accountId"
//@Access: PROTECTED
//@Roles: ADMIN
//@Description: Brise account
const deleteAccount = asyncHandler(async (req, res) => {
    const accountId = req.params.accountId

    const exist = await _accountContext.exists({ _id: accountId })
    if(!exist) _mw.error.send(res, _code.notFound, _msg.accountNotFound)

    const deletedAccount = await _accountContext.findByIdAndDelete({ _id: accountId })
    
    res.status((deletedAccount) ? _code.ok : _code.noContent).json(_msg.deletedAccount)
})

//#endregion
//==============================================================================================================================================//
//#region Accounts + Tags

//@POST: "/api/account/_ACCOUNT_ID_/tags" 
//@Access: PROTECTED
//@Roles: ADMIN
//@Description: Dodaje listu tagova [tags] u account
const addFollowingTags = asyncHandler( async (req, res) => {
    const accountId = req.params.accountId
    const newTags = req.body

    const addedTags = await _accountContext.findOneAndUpdate({ _id: accountId, followingTags: { $nin: newTags }}, { $push: { followingTags: newTags }}, { new: true })

    res.status((addedTags) ? _code.ok : _code.badRequest).json(addedTags ?? _msg.existAccountTag)
})

//@DELETE: "/api/account/_ACCOUNT_ID_/tags" 
//@Access: PROTECTED
//@Roles: ADMIN
//@Description: Dodaje listu tagova [tags] u account
const removeFollowingTags = asyncHandler( async (req, res) => {
    const accountId = req.params.accountId
    const removeTag = req.body

    const removedTag = await _accountContext.findOneAndUpdate({ _id: accountId }, { $pullAll: { followingTags: removeTag }}, { new: true })

    res.status((removedTag) ? _code.ok : _code.badRequest).json(removedTag ?? _msg.existAccountTag)
})

//#endregion
//==============================================================================================================================================//
//#region Accounts + Playlists
//#endregion
//==============================================================================================================================================//
//#region Accounts + Reviews
//#endregion
//==============================================================================================================================================//
//#region Accounts + Reviews
//#endregion
//==============================================================================================================================================//
//#region Accounts + Me

//@GET: "/api/account/me"
//@Access: PROTECTED
//@Roles
//@Description: Povlaci account
const getMe = (req, res, next) => {
    req.params.accountId = req.myAccount._id
    req.body.roles = undefined;
    next()
}

//#endregion
//==============================================================================================================================================//
//#region Accounts Alias
//#endregion
//==============================================================================================================================================//

module.exports = {
    // Accounts
    getAllAccounts,
    getAccount,
    createAccount,
    patchAccount,
    deleteAccount,

    //Accounts + Tags
    addFollowingTags,
    removeFollowingTags,

    //Accounts + Playlists

    //Accounts + Reviews

    //Accounts + Me
    getMe

    //Accounts Alias

}