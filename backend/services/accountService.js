const mongoose = require("mongoose")
const asyncHandler = require("express-async-handler")

const _tagContext = require("../models/tagModel")
const _accountContext = require("../models/accountModel")
const _mediaContext = require("../models/mediaModel")

const _code = require("../helpers/statusCodes")
const _msg = require("../helpers/msg")
const _mw = require("../helpers/middlewares")
const _obj = require("../helpers/projections")
const _enum = require("../helpers/enums")
const _security = require("../configs/security")

const validator = { runValidators: true }
//==============================================================================================================================================//
//#region Accounts

//@GET: "/api/accounts?skip=_NUM_&limit=_NUM_&name=_TXT_&email=_TXT_&roles=admin&roles=user...""
//@Access: PROTECTED
//@Roles: ADMIN
//@Description: Povlaci sve account-ove
const getAllAccounts = asyncHandler( async (req, res) => {
    const skip = parseInt((req.query.skip) ?? 0)
    const limit = parseInt((req.query.limit) ?? 10)

    const obj = _obj.filter(req.query, "name", "email", "roles")
    let query = (obj.name || obj.email) ? {"$or": []} : {}

    if (obj.name) query["$or"].push({"name": {$regex: obj.name, $options: "i"}})
    if (obj.email) query["$or"].push({"email": {$regex: obj.email, $options: "i"}})

    if(obj.roles) {
        if(!(obj.roles instanceof Array)) obj.roles = [obj.roles]

        query["$and"]  = obj.roles.filter(roleValid => _enum.roles.type[roleValid.toLowerCase()]).map(role => ({ [`roles.${[role.toLowerCase()]}`]: true  }) )
        
        if(query["$or"]) query = { "$and": [ {$or: query["$or"]}, {$and: query["$and"]} ] }
    }
    console.log(query)
    const allAccountsQuery = await _accountContext.find(query, _obj.one.Id.Email.Name.Picture.Roles.FollowingTags.result).skip(skip).limit(limit).lean()

    res.status(_code.ok).json(allAccountsQuery)
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

    const account = await _accountContext.findOne({ _id: accountId }).lean()

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
    const newTagsId = newTags.map(e => mongoose.Types.ObjectId(e._id))

    const addedTags = await _accountContext.findOneAndUpdate({ _id: accountId, "followingTags._id": { $nin: newTagsId }}, { $push: { followingTags: newTags }})

    res.status((addedTags) ? _code.ok : _code.badRequest).json(addedTags ?? _msg.existAccountTag)
})

//@DELETE: "/api/accounts/_ACCOUNT_ID_/tags" 
//@Access: PROTECTED
//@Roles: ADMIN
//@Description: Brise listu tagova [tags] u account
const removeFollowingTags = asyncHandler( async (req, res) => {
    const accountId = req.params.accountId
    const removeTags = req.body

    const removedTags = await _accountContext.findOneAndUpdate({ _id: accountId }, { $pull: { "followingTags": { _id: { $in: removeTags }}}}, { new: true })

    res.status((removedTags) ? _code.ok : _code.badRequest).json(removedTags ?? _msg.accountTagsNotFound)
})

//@PATCH: "/api/accounts/_ACCOUNT_ID_/tags" 
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

//@POST: "/api/accounts/_ACCOUNT_ID_/playlist/_PLAYLIST_NAME_"
//@Access: PUBLIC
//@Roles: ADMIN
//@Description: Dodaje listu tagova [tags] u account
const addMediaToPlaylist = asyncHandler( async (req, res) => {
    const accountId = req.params.accountId
    const playlistName = req.params.playlist
    const media = _obj.filter(req.body, "_id", "name", "picture")

    const obj = { playlists: { name: playlistName, _id: media._id, mediaName: media.name, mediaPicture: media.picture } }
    const result = await _accountContext.updateOne({ _id: accountId}, { $push: obj })
    const success = result.modifiedCount !== 0

    res.status((success) ? _code.ok : _code.badRequest).json(success ? _msg.success : _msg.failed)
})

//@DELETE: "/api/accounts/_ACCOUNT_ID_/playlist/_PLAYLIST_NAME_/_MEDIA_ID_"
//@Access: PUBLIC
//@Roles: ADMIN
//@Description: Dodaje listu tagova [tags] u account
const deleteMediaFromPlaylist = asyncHandler( async (req, res) => {
    const accountId = req.params.accountId
    const playlistName = req.params.playlist
    const mediaId = req.params.mediaId

    const obj = { "playlists.media.id": mediaId }
    const result = await _accountContext.updateOne({ _id: accountId, "playlists.name": playlistName}, { $pull: { "playlists": { _id: mediaId } } })
    // const bruh = await _accountContext.findById( {_id: accountId}, {playlists: 1} ).populate("playlists._id")
    res.status((result) ? _code.ok : _code.badRequest).json(result ? _msg.success : _msg.failed)
})
//#endregion
//==============================================================================================================================================//
//#region Accounts + Reviews
//#endregion
//==============================================================================================================================================//
//#region Accounts + Me

//@MIDDLEWARE: "/api/account/all"
//@Access: PROTECTED
//@Roles: Users
//@Description: Povlaci account
const getMe = (req, res, next) => {
    req.params.accountId = req.myAccount._id
    delete req.body["roles"]
    next()
}

//#endregion
//==============================================================================================================================================//
//#region Accounts Alias
//#endregion
//==============================================================================================================================================//

module.exports = {
    //Accounts
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
    addMediaToPlaylist,
    deleteMediaFromPlaylist,

    //Accounts + Reviews

    //Accounts + Me
    getMe,

    //Accounts Alias

}