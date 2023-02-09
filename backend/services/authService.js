const mongoose = require("mongoose")
const asyncHandler = require("express-async-handler")

const _accountContext = require("../models/accountModel")

const _security = require("../configs/security")
const _code = require("../helpers/statusCodes")
const _msg = require("../helpers/msg")
const _mw = require("../helpers/middlewares")

const cookieOptions = { overwrite: true, expires: new Date(Date.now() + 7*24*60*60*1000), httpOnly: true, }

const signToken = (id, res) => {
    const token = _security.jwtSign(id)
    res.cookie("tvq-jwt", token, cookieOptions)
    return token
}

const register = asyncHandler(async (req, res, next) => {
    const { email, name, password, picture } = req.body;
    const createdAccount = await _accountContext.create({ email, name, password, picture})

    const token = signToken(createdAccount._id, res)

    res.status(_code.created).json(_msg.registeredAccount)
})

const login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body

    if(!email) _mw.error.send(res, _code.badRequest, _msg.wrongEmail)
    if(!password) _mw.error.send(res, _code.badRequest, _msg.wrongPassword)

    const account = await _accountContext.findOne({ email }, { _id: 1, password: 1 })
    if(!account) _mw.error.send(res, _code.badRequest, _msg.wrongEmail)
    
    if (!(await account.comparePassword(password, account.password))) 
        _mw.error.send(res, _code.unauthorized, _msg.wrongPassword)

    const token = signToken(account._id, res)

    res.status(_code.ok).json(_msg.loggedInAccount)
})

const logout = asyncHandler(async (req, res, next) => {
    res.cookie("tvq-jwt", "", cookieOptions)
    res.status(_code.ok).json(_msg.loggedOutAccount)
})

module.exports = {
    register,
    login,
    logout
}