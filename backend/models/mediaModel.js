const mongoose = require("mongoose")

const _code = require("../helpers/statusCodes")
const _msg = require("../helpers/msg")
const _enum = require("../helpers/enums")

//Schema definition
const mediaSchema = mongoose.Schema({
    name: String,
    searchName: { 
        type: String, 
        select: false,
    },
    type: { type: String, enum: _enum.toValueList(_enum.media) },
    picture: String,
    description: String,
    airedDate: { type: Date, index: true},
    avgRating: { type: Number, default: 0 },
    rating: { type: Number, default: 0 }, // trendiness
    reviewCount: { type: Number, default: 0 },
    parent: {
        _id: { type: mongoose.Types.ObjectId },
        name: String,
        seasonEpisode: { 
            type: String, 
            validate: {
                validator: function(val) {
                    return val.match(/^S#[0-9]+-E#[0-9]+$/) ? true : false
                },
                message: `Season episode format must be S#<NUMBER>-E<NUMBER>`
            },
        },
        required: false
    },
    participated: {
        type: [{
            role: { type: String, enum: _enum.toKeyList(_enum.roles) },
            accountId: { type: mongoose.Types.ObjectId },
            accountName: String
        }],
        _id: false,
        default: undefined
    },
    
    
    reviews: {
        type: [{
            _id: { type: mongoose.Types.ObjectId },
            _userId: { type: mongoose.Types.ObjectId },
            name: String,
            rating: Number,
            comment: String       
        }],
        default: undefined
    },
    episodes: {
        type: [{
            _id: { type: mongoose.Types.ObjectId },
            name: String,
            seasonEpisode: { 
                type: String, 
                validate: {
                    validator: function(val) {
                        return val.match(/^S#[0-9]+-E#[0-9]+$/) ? true : false
                    },
                    message: `Season episode format must be S#<NUMBER>-E#<NUMBER>`
                },
            },     
        }],
        default: undefined
    },

    tags: {
        type: [{
            _id: mongoose.Types.ObjectId, 
            name: String           
        }],
        default: undefined
    }    
},
{
    timestamps: true
})

//Indexes
//Compound index
mediaSchema.index( {searchName: 1}, {type: 1}) 

//Pre middleware
mediaSchema.pre('save', function(next) {
    if(!this.searchName && this.name) {
        console.log("aeeee")
        this.searchName = this.name.toLowerCase()
    }
    next()
})
//Post middleware

//Helper functions

//Final step
module.exports = mongoose.model("Media", mediaSchema)