module.exports = {
    //Project
    result: {},
    default: 1,
    get __v() { this.result.__v = 0; return this },


    get one() { this.default = 1; return this },
    get zero() { this.default = 0; return this },
    get neg() { this.default = -1; return this },

    get Id() { this.result._id = this.default; return this },
    get Name() { this.result.name = this.default; return this },
    get Email() { this.result.email = this.default; return this },
    get Roles() { this.result.roles = this.default; return this },
    get Picture() { this.result.picture = this.default; return this },
    get Reviews() { this.result.picture = this.default; return this },
    get Playlists() { this.result.playlists = this.default; return this },
    get MediaCount() { this.result.mediaCount = this.default; return this },
    get FollowingTags() { this.result.followingTags = this.default; return this },




    //Functions
    MediaEmbedded: function(skip, limit) { 
        this.result.mediaEmbedded = (!skip) ? this.default : {$slice: [skip, limit]}
        return this
    },

    //Filter
    filterBody: (obj, ...args) => {
        const newObj = {}
        Object.keys(obj).forEach(el => {
            if (args.includes(el)) newObj[el] = obj[el]
        })
        return newObj
    }
}