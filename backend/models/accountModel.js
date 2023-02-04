const mongoose = require("mongoose")

const _code = require("../utils/statusCodes")
const _msg = require("../utils/msg")

//Schema definition
const accountSchema = mongoose.Schema({
    
})

//Indexes

//Pre middleware

//Post middleware

//Helper functions

//Final step
module.exports = mongoose.model("Account", accountSchema)