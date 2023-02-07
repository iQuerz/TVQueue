const access = require("../middlewares/accessMiddleware")
const checker = require("../middlewares/checkerMiddleware")
const error = require("../middlewares/errorMiddleware")

module.exports = {
    access,
    checker,
    error
}
