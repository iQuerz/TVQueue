//Require
const express = require("express")

const mongoCfg = require("./configs/mongodb")
const _serverCfg = require("./configs/server")
const _error = require("./middlewares/errorMiddleware")

//Setup main
mongoCfg.connectDB();
const app = express()

//Setup middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static("./public")) //localhost:port/images/{folder_name}/{image_name}

//Routes
app.use("/api/accounts", require("./routes/accountRoute"))
app.use("/api/media", require("./routes/mediaRoute"))
app.use("/api/tags", require("./routes/tagRoute"))

app.use(_error.errorHandler)

app.listen(_serverCfg.port, () => console.log(`Server started - localhost:${_serverCfg.port}`))