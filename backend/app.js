//Require
const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")

const _cfg = require("./helpers/configs")
const _mw = require("./helpers/middlewares")
const _obj = require("./helpers/projections")

//Setup main
_cfg.mongo.connectDB();
const app = express()

//Setup middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static("./public")) //localhost:port/images/{folder_name}/{image_name}
app.use(cookieParser())

//Routes
app.use("/", require("./routes/aliasRoute"))

app.use("/api/accounts", require("./routes/accountRoute"))
app.use("/api/media", require("./routes/mediaRoute"))
app.use("/api/tags", require("./routes/tagRoute"))

//Errors
app.all("*", _mw.error.wrongUrlHandler)
app.use(_mw.error.globalHandler)

//Start server
app.listen(_cfg.server.port, () => console.log(`Server started - localhost:${_cfg.server.port}`))