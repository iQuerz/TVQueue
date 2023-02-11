//Not really enums but whatever... moongose doesn't work with Symbol
module.exports = {

    roles: {
        type: {
            user: "User",
            admin: "Admin",
            actor: "Actor",
            director: "Director",
            participated: "Participated"
        },
    },

    media: {
        type: {
            movie: "Movie",
            tvshow: "TV Show",
            episode: "Episode"
        },
    },

    staticTags: {
        type: {
            trending: "Trending",
            featured: "Featured",
            ourpicks: "Our Picks"
        },
    },

    playlists: {
        type: {
            watched: "Watched",
            watching: "Watching",
            watchlater: "Watch Later"
        },
    },

    //Functions
    toKeyList: function(e) { return Object.keys(e.type) },
    toValueList: function(e) { return Object.values(e.type) }
    
}