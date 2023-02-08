const asyncHandler = require("express-async-handler")

const _accountContext = require("../models/accountModel")

const _security = require("../configs/security")
const _code = require("../helpers/statusCodes")
const _msg = require("../helpers/msg")
const _obj = require("../helpers/projections")

const protect = asyncHandler(async (req, res, next) => {
    const token = req.cookies["tvq-jwt"] 
    
    if(!token) {
        res.status(_code.unauthorized)
        throw new Error(_msg.notLoggedIn)
    }

    const data = _security.jwtVerify(token)

    const account = await _accountContext.findById({ _id: data._id }, _obj.one.Id.Name.Roles.result).lean()
    if(!account) {
        res.status(_code.unauthorized)
        throw new Error(_msg.wrongToken)
    }
    
    req.myAccount = account
    next()
})

const authorize = (...args) => {
    return (req, res, next) => {
        if(!args.some(role => req.myAccount.roles[role])) {
            res.status(_code.forbidden)
            throw new Error(_msg.noPermissions)
        }
        next()
    }
}

module.exports = {
    protect,
    authorize
}