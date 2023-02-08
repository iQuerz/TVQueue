//Not really enums but whatever... moongose doesn't work with Symbol
module.exports = {
    
    roles: {
        user: "User",
        admin: "Admin",
        actor: "Actor",
        director: "Director"
    },

    media: {
        movie: "Movie",
        tvShow: "TV Show",
        episode: "Episode"
    },

    staticTags: {
        trending: "Trending",
        featured: "Featured",
        ourPicks: "Our Picks"
    },

    playlists: {
        watched: true,
        watching: true,
        watchLater: true
    }
}