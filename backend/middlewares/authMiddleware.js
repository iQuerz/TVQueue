const checkAuthentication = (req, res, next) => {
    console.log("Check Authentication")
    next()
}

const checkAuthorization = (req, res, next) => {
    console.log("Check Authorization")
    next()
}

module.exports = {
    checkAuthentication,
    checkAuthorization
}