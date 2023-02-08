//Not really enums but whatever... moongose doesn't work with Symbol
module.exports = {
    
    roles: {
        User: "user",
        Admin: "admin",
        Actor: "actor",
        Director: "director"
    },

    media: {
        Movie: "Movie",
        TvShow: "TV Show",
        Episode: "Episode"
    },

    staticTags: {
        Trending: "Trending",
        Featured: "Featured",
        OurPicks: "Our Picks"
    },

    playlists: {
        Watched: "watched",
        Watching: "watching",
        WatchLater: "watchlater"
    }
}