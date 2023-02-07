const _code = require("../helpers/statusCodes")
const _msg = require("../helpers/msg")

const globalHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ?? 500

    res.status(statusCode).json({ 
        message: err.message,
        stackTrace: err.stack
    })
}

const wrongUrlHandler = (req, res, next) => {
    res.status(_code.notFound)
    throw new Error(_msg.wrongUrl)
}

const send = (res, code, msg) => {
    res.status(code)
    throw new Error(msg)
}

module.exports = {
    globalHandler,
    wrongUrlHandler,
    send
}