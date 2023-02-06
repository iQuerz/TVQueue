const mongoose = require("mongoose")

const _code = require("../helpers/statusCodes")
const _msg = require("../helpers/msg")

//Schema definition
const accountSchema = mongoose.Schema({
    email: { type: String, required: [true, _msg.requiredAccountEmail], unique: true, lowercase: true, index: true },
    name: { type: String, required: [true, _msg.requiredAccountName]}
},
{
    timestamps: true
})

//Indexes
accountSchema.index(
    { "email": 1 }
)

//Pre middleware

//Post middleware

//Helper functions

//Final step
module.exports = mongoose.model("Account", accountSchema)