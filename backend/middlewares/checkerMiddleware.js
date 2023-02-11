const _msg = require("../helpers/msg")
const _code = require("../helpers/statusCodes")

const isBodyEmpty = (req, res, next) => {
    if(isObjectEmpty(req.body)) {
        res.status(_code.badRequest)
        throw new Error(_msg.requiredBody)
    }
    next()
}

const isQueryEmpty = (req, res, next) => {
    if(isObjectEmpty(req.body)) {
        res.status(_code.badRequest)
        throw new Error(_msg.requireQuery)
    }
    next()
}

const isObjectEmpty = (obj) => {
    if(Object.keys(obj).length === 0)
        return true
    return false;
}

module.exports = {
    isBodyEmpty,
    isQueryEmpty,
    isObjectEmpty
}