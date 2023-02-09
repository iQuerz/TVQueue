const mongoose = require("mongoose")
const asyncHandler = require("express-async-handler")

const _accountContext = require("../models/accountModel")

const _code = require("../helpers/statusCodes")
const _msg = require("../helpers/msg")
const _mw = require("../helpers/middlewares")
const _obj = require("../helpers/projections")
const _enum = require("../helpers/enums")
const _security = require("../configs/security")

const validator = { runValidators: true }
//==============================================================================================================================================//
//#region Accounts

//@GET: "/api/account?skip=_NUM_&limit=_NUM_" 
//@Access: PROTECTED
//@Roles: ADMIN
//@Description: Povlaci sve account-ove
const getAllAccounts = asyncHandler( async (req, res) => {
    const query = _obj.filter(req.query, "text", "roles", "skip", "limit")

    query.skip = parseInt((query.skip) ?? 0)
    query.limit = parseInt((query.limit) ?? 10)

    if (query.roles) {
        if(!(query.roles instanceof Array)) query.roles = [query.roles]
            query.roles = query.roles.filter(roleValid => _enum.roles.type[roleValid.toLowerCase()]).map(role => ({ [role.toLowerCase()]: true  }) )
        
        if (query.roles.length > 0) ({ "$or": query.roles }) 
        else delete query.roles
    }
    
    console.log(query)

        // $or: [{"roles.director": true}, {"roles.actor": true}]}
      
    // let allAccountsQuery = _accountContext.find({}, _obj.one.Id.Name.Picture.Roles.FollowingTags.result)

    // if (!isNaN(req.query.skip) && req.query.limit)
    //     allAccountsQuery = allAccountsQuery.skip(skip).limit(limit)

    // // const allAccounts = await allAccountsQuery.lean()
    console.log(query)
    res.status(_code.ok).json(query)
})

//@POST: "/api/accounts" 
//@Access: PROTECTED
//@Roles: ADMIN
//@Description: Koristi se za kreiranje fake naloga (actor i director)
const createAccount = asyncHandler(async (req, res) => {
    const account = _obj.filter(req.body, "email", "name", "picture", "roles")

    account._id = mongoose.Types.ObjectId();
    account.email = `${Number(new Date).toString(36).slice(-6)}@email.com`
    account.password = Number(new Date).toString(35).slice(-5);

    const createdAccount = await _accountContext.create(account)
    
    res.status(_code.created).json(account)
})

//@GET: "/api/accounts/:accountId"
//@Access: PUBLIC
//@Roles: ALL
//@Description: Povlaci account
const getAccount = asyncHandler(async (req, res) => {
    const accountId = req.params.accountId

    const account = await _accountContext.findOne({ _id: accountId }, _obj.one.Id.Name.Email.Picture.FollowingTags.result).lean()

    res.status((account) ? _code.ok : _code.noContent).json(account)
})

//@PATCH: "/api/accounts/:accountId"
//@Access: PROTECTED
//@Roles: ADMIN
//@Description: Updateuje samo deo prosledjen u body
const patchAccount = asyncHandler(async (req, res) => {
    const accountId = req.params.accountId

    if(req.body.playlists) throw new Error(_msg.forbiddenPlaylist)
    if(req.body.reviews) throw new Error(_msg.forbiddenReviews)
    if(req.body.followingTags) throw new Error(_msg.forbiddenFollowingTags)
 
    const updatedAccount = await _accountContext.findByIdAndUpdate({ _id: accountId }, req.body, { new: true })
    
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

//@POST: "/api/accounts/_ACCOUNT_ID_/tags" 
//@Access: PROTECTED
//@Roles: ADMIN
//@Description: Dodaje listu tagova [tags] u account
const addFollowingTags = asyncHandler( async (req, res) => {
    const accountId = req.params.accountId
    const newTags = req.body
    const newTagsId = newTags.map(e => e._id)

    const addedTags = await _accountContext.findOneAndUpdate({ _id: accountId, "followingTag._id": { $nin: newTagsId }}, { $push: { followingTags: newTags }}, { new: true })

    res.status((addedTags) ? _code.ok : _code.badRequest).json(addedTags ?? _msg.existAccountTag)
})

//@DELETE: "/api/accounts/_ACCOUNT_ID_/tags" 
//@Access: PROTECTED
//@Roles: ADMIN
//@Description: Brise listu tagova [tags] u account
const removeFollowingTags = asyncHandler( async (req, res) => {
    const accountId = req.params.accountId
    const removeTags = req.body
    const removeTagsId = removeTags.map(e => e._id)
    console.log(removeTagsId)
    const removedTags = await _accountContext.findOneAndUpdate({ _id: accountId }, { $pull: { "followingTags": { _id: { $in: removeTagsId }}}}, { new: true })

    res.status((removedTags) ? _code.ok : _code.badRequest).json(removedTags ?? _msg.accountTagsNotFound)
})

//@PATCH: "/api/accounts/:tagId/media/:mediaId" 
//@Access: PROTECTED
//@Roles: ADMIN
//@Description: Koristi se za updatovanje taga kad se update-uje sam tag dokument
const updateFollowingTag = asyncHandler(async (req, res) => {
    const accountId = req.params.accountId
    const tag = req.body

    if (!tag._id || !tag.name) _mw.error.send(res, _code.badRequest, _msg.wrongIdNameTag)

    const result = await _accountContext.updateOne({ _id: accountId, "followingTags._id": tag._id }, { $set: { "followingTags.$.name": tag.name }})
    
    if (result.modifiedCount === 0) _mw.error.send(res, _code.notFound, _msg.updatedAccountTagFailed)

    res.status(_code.ok).json(_msg.updatedAccountTag)
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

//@MIDDLEWARE: "/api/account/me"
//@Access: PROTECTED
//@Roles: Users
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
    updateFollowingTag,

    //Accounts + Playlists

    //Accounts + Reviews

    //Accounts + Me
    getMe

    //Accounts Alias

}