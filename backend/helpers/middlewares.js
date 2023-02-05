const auth = require("../middlewares/authMiddleware")
const checker = require("../middlewares/checkerMiddleware")
const error = require("../middlewares/errorMiddleware")

module.exports = {
    auth,
    checker,
    error
}
