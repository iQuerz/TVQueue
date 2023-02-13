const mongoose = require("mongoose")
const asyncHandler = require("express-async-handler")
var cron = require('node-cron');

const _mediaContext = require("../models/mediaModel")
const _util = require("../helpers/utility")

let skip = 0
let limit = 1000

const scheduleRating = cron.schedule("* * * * *", async () => {
    let mediaDocs = await _mediaContext.find({},{ _id: 1, avgRating: 1, rating: 1, reviews: 1, reviewCount: 1 }).sort({ _id: 1 }).skip(skip).limit(limit)

    const bulkOperation = mediaDocs.flatMap(media => {
        if(!media.reviews) return []

        media.avgRating = media.reviews.reduce((acc, review)=> acc + review.rating) / media.reviews.length
        media.rating = _util.trendiness(media.avgRating, media.reviews.length)
        return { "updateOne" : { "filter" : { "_id" : media._id }, "update" : { "$set" : { "avgRating": media.avgRating, "rating": media.rating } } } } 
    })
    await _mediaContext.bulkWrite(bulkOperation)
    skip = (mediaDocs.length === limit) ? (skip + limit) : 0
})

module.exports = {
    scheduleRating,
}

