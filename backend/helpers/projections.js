module.exports = {
    //Project
    result: {},
    default: 1,
    get __v() { this.result.__v = 0; return this },

    get one() { this.default = 1; return this },
    get zero() { this.default = 0; return this },
    get neg() { this.default = -1; return this },

    //Generic
    get Id() { this.result._id = this.default; return this },
    get Name() { this.result.name = this.default; return this },

    //Account
    get Email() { this.result.email = this.default; return this },
    get Roles() { this.result.roles = this.default; return this },
    get Picture() { this.result.picture = this.default; return this },
    get Playlists() { this.result.playlists = this.default; return this },
    get FollowingTags() { this.result.followingTags = this.default; return this },

    //Media
    get Type() { this.result.type = this.default; return this },
    get Description() { this.result.description = this.default; return this },
    get AiredDate() { this.result.airedDate = this.default; return this },
    get Rating() { this.result.rating = this.default; return this },
    get ReviewCount() { this.result.reviewCount = this.default; return this },
    get Parent() { this.result.reviewCount = this.default; return this },
    get Trendiness() { this.result.trendiness = this.default; return this },



    //Tag
    get MediaCount() { this.result.mediaCount = this.default; return this },

    //Functions
    funcSlice: function(name, skip, limit) {
        const leap = parseInt((skip) ?? 0)
        const cap = parseInt((limit) ?? 10)
        this.result[name] = (cap) ? {$slice: [leap, cap]} : this.default
        return this
    },

    MediaEmbedded: function(skip, limit) { 
        return this.funcSlice("mediaEmbedded", skip, limit)
    },

    Reviews: function(skip, limit) { 
        return this.funcSlice("reviews", skip, limit)
    },
    
    Participated: function(skip, limit) { 
        return this.funcSlice("participated", skip, limit)
    },

    Tags: function(skip, limit) { 
        return this.funcSlice("tags", skip, limit)
    },

    Episodes: function(skip, limit) { 
        return this.funcSlice("episodes", skip, limit)
    },



    //Filter
    filter: (obj, ...args) => {
        return Object.fromEntries(Object.entries(obj).filter(([field, value]) => (args.includes(field) && value != null)));
    }
}