module.exports = {
    trendiness: (avgRating, ratingCount) => {
        const c = 100
        const m = 8
        return ((avgRating * ratingCount)+(c*m))/(ratingCount+c)
    },

    average: (avgRating, count, newRating) => {
        let result
        if (newRating > 0) result = (avgRating) ? parseFloat(((avgRating * (count-1)) + newRating) / count) : newRating
        else result = (avgRating) ? parseFloat(((avgRating * (count)) + newRating) / (count-1)) : 0.0
        return result
    }
}