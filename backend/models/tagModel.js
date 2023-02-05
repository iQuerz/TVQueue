const mongoose = require("mongoose")

const _code = require("../helpers/statusCodes")
const _msg = require("../helpers/msg")

//Schema definition
const tagSchema = new mongoose.Schema({
    name: { type: String, required: [true, _msg.requiredName], unique: true },
    mediaEmbedded: { 
        type: [{
        _id: { type: mongoose.ObjectId, index: true },
        type: { type: String, index: true },
        picture: String,
        name: String,
        rating: { type: Number, index: true },
        airedDate: { type: Date, index: true }
    }],
    required: false
    }
}, 
{
    timestamps: true
})

//Indexes
tagSchema.index(
    { "mediaEmbedded._id": 1 },
    { "mediaEmbedded.type": 1 },
    { "mediaEmbedded.rating": -1 },
    { "mediaEmbedded.airedDate": -1 }
)

//Pre middleware

//Post middleware
tagSchema.post("save", function(error, doc, next) {
    if (error.keyValue.name && error.code === 11000)
        next(new Error(_msg.existName(error.keyValue.name)))
    else 
        next(error)
})

//Helper functions

//Final step
module.exports = mongoose.model("Tag", tagSchema)


