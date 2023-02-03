const _auth = require("../middlewares/authMiddleware")

const example = () => {
    _auth.checkAuthentication()
    _auth.checkAuthorization()
    console.log("In utility.js")
}

module.exports = {
    example
}