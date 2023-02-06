const mongoose = require("mongoose")

const _code = require("../helpers/statusCodes")
const _msg = require("../helpers/msg")

//Schema definition
const tagSchema = new mongoose.Schema({
    name: { type: String, required: [true, _msg.requiredTagName], unique: true },
    mediaCount: { type: Number, default: 0 }, 
    mediaEmbedded: { 
        type: [{
        _id: { type: mongoose.ObjectId, index: true },
        type: { type: String, enum: ["Movie", "TV Show", "Episode"] },
        picture: String,
        name: String,
        rating: Number,
        airedDate: Date
    }],
    required: false
    }
}, 
{ 
    timestamps: true, 
    // id: false,
    // toJSON: { virtuals: true }
})

//Indexes
tagSchema.index(
    { "mediaEmbedded._id": 1 }
)

//Virtuals

//Pre middleware
tagSchema.pre("save", function(next) { 
    if(!this.name) throw new Error(_msg.requiredTagName)
    next()
})

//Post middleware
tagSchema.post("save", function(error, doc, next) {
    if (error.keyValue.name && error.code === 11000)
        next(new Error(_msg.existTagName))
    else
        next(error)
})

//Helper functions

//Final step
module.exports = mongoose.model("Tag", tagSchema)


