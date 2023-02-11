module.exports = {
    trendiness: (avgRating, ratingCount) => {
        const c = 100
        const m = 3
        return ((avgRating * ratingCount)+(c*m))/(ratingCount+c)
    }
}