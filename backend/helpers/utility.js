module.exports = {
    trendiness: (avgRating, ratingCount) => {
        const c = 100
        const m = 8
        return ((avgRating * ratingCount)+(c*m))/(ratingCount+c)
    }
}