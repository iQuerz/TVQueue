//Require
const express = require("express")
const connectMongoDB = require("./configs/mongodb")

const serverConfig = require("./configs/server")
const errorMiddleware = require("./middlewares/errorMiddleware")

//Setup
connectMongoDB();
const app = express()

//Setup middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static("./public")) //localhost:port/images/{folder_name}/{image_name}

app.use("/api/accounts", require("./routes/accountRoute"))
app.use("/api/media", require("./routes/mediaRoute"))
app.use("/api/tags", require("./routes/tagRoute"))

app.use(errorMiddleware.errorHandler)

app.listen(serverConfig.port, () => console.log(`Server started - localhost:${serverConfig.port}`))