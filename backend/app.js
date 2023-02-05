//Require
const express = require("express")

const _cfg = require("./helpers/configs")
const _mw = require("./helpers/middlewares")

//Setup main
_cfg.mongo.connectDB();
const app = express()

//Setup middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static("./public")) //localhost:port/images/{folder_name}/{image_name}

//Routes
app.use("/api/accounts", require("./routes/accountRoute"))
app.use("/api/media", require("./routes/mediaRoute"))
app.use("/api/tags", require("./routes/tagRoute"))

app.use(_mw.error.handler)

app.listen(_cfg.server.port, () => console.log(`Server started - localhost:${_cfg.server.port}`))