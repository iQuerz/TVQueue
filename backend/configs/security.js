const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const bcryptSaltRounds = 10

const jwtPrivateKey = "ljubibrt"
const jwtExpire = "7d"

module.exports = {
    bcrypt,
    bcryptSaltRounds,

    jwt,
    jwtPrivateKey,
    jwtExpire,
    jwtSign: (id) => { return jwt.sign({ _id: id }, jwtPrivateKey, { expiresIn: jwtExpire })},
    jwtVerify: (token) => { return jwt.verify(token, jwtPrivateKey)}


}