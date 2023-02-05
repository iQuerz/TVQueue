const handler = (err, req, res, next) => {
    const statusCode = res.statusCode ?? 500

    res.status(statusCode).json({ 
        message: err.message,
        stackTrace: err.stack
    })
}

const send = (res, code, msg) => {
    res.status(code)
    throw new Error(msg)
}

module.exports = {
    handler,
    send
}