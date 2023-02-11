const mongoose = require("mongoose")

const _code = require("../helpers/statusCodes")
const _msg = require("../helpers/msg")
const _enum = require("../helpers/enums")

//Schema definition
const mediaSchema = mongoose.Schema({
    name: { type: String, index: true },
    type: { type: String, enum: _enum.toValueList(_enum.media) },
    picture: String,
    description: String,
    airedDate: { type: Date, index: true},
    rating: { type: Number, default: 0 },
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
    participated: [{
        role: { type: String, enum: _enum.toKeyList(_enum.roles) },
        accountId: { type: mongoose.Types.ObjectId },
        accountName: String
    }],
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

//Pre middleware

//Post middleware

//Helper functions

//Final step
module.exports = mongoose.model("Media", mediaSchema)