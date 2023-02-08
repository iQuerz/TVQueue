const mongoose = require("mongoose")

const _code = require("../helpers/statusCodes")
const _msg = require("../helpers/msg")
const _enum = require("../helpers/enums")


//Schema definition
const tagSchema = new mongoose.Schema({
    name: { type: String, required: [true, _msg.requiredTagName], unique: true },
    mediaCount: { type: Number, default: 0 }, 
    mediaEmbedded: { 
        type: [{
            _id: { type: mongoose.Types.ObjectId, index: true },
            type: { type: String, enum: [_enum.media.Movie, _enum.media.TvShow] },
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

//Methods

//Final step
module.exports = mongoose.model("Tag", tagSchema)


