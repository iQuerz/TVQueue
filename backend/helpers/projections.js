module.exports = {
    //Account
    account: {
        getId_Name_Roles: { _id: 1, name: 1, roles: 1 },
        getId_Name_Picture_Roles: { _id: 1, name: 1, picture: 1, roles: 1 }
    },

    //Media
    media: {
        getIdNamePictureRoles: { _id: 1, name: 1, picture: 1, roles: 1 }
    },

    //Tag
    tag: {
        getId_Name_MediaCount: { _id: 1, name: 1, mediaCount: 1 },
        getName_MediaCountMedia_MediaEmbedded: (skip, limit) => { return { _id: 0, mediaEmbedded: { $slice: [skip, limit] }, name: 1, mediaCount: 1 } }
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