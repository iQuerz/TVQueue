const mongoose = require("mongoose")
const validator = require("validator")

const _security = require("../configs/security")
const _code = require("../helpers/statusCodes")
const _msg = require("../helpers/msg")
const _enum = require("../helpers/enums")

//Schema definition
const accountSchema = mongoose.Schema({
    email: { type: String, required: [true, _msg.requiredAccountEmail], unique: true, lowercase: true, validate: [validator.isEmail, _msg.invalidEmail] },
    name: { type: String, required: [true, _msg.requiredAccountName] },
    password: { type: String, required: [true, _msg.requiredAccountPassword], select: false, minLength: 3 },
    picture: { type: String },
    roles: { 
        type: Map,
        of: Boolean,
        default: { admin: true, user: true },
        validate: {
            validator: function(val) {
                let valide = true
                val.forEach((value, role) => {
                    if(!Object.values(_enum.roles).includes(role))
                        valide = false
                })
                return valide
            },
            message: `Allowed types: ${Object.values(_enum.roles)}`
        }
    },
    playlists: [{
        name: { type: String, enum: [_enum.playlists.WatchLater, _enum.playlists.Watched, _enum.playlists.Watching] },
        media: { type: mongoose.Types.ObjectId, ref: "Media" }
    }],
    reviews: [{
        rating: Number,
        media: { type: mongoose.Types.ObjectId, ref: "Media" }
    }],
    followingTags: [{ type: mongoose.Types.ObjectId, ref: "Tag"}]
},
{
    timestamps: true
})

//Indexes
accountSchema.index(
    { "email": 1 }
)

//Virtuals

//Pre middleware
accountSchema.pre("save", async function(next) {
    if(this.isModified("password")) {
        const salt = await _security.bcrypt.genSalt(_security.bcryptSaltRounds)
        const hashedPassword = await _security.bcrypt.hash(this.password, salt)
        
        this.password = hashedPassword;
    }
    next()    
})

accountSchema.pre("findOneAndUpdate", async function(next) {
    const { _id } = this.getQuery()
    const update = this.getUpdate()
    console.log(update)
    if(update.password) {
        const salt = await _security.bcrypt.genSalt(_security.bcryptSaltRounds)
        update.password = await _security.bcrypt.hash(update.password, salt)
    }

    if(update.playlists) throw new Error(_msg.forbiddenPlaylist)
    if(update.reviews) throw new Error(_msg.forbiddenReviews)
    if(update.followingTags) throw new Error(_msg.forbiddenFollowingTags)

    next()    
})





//Post middleware

//Methods
accountSchema.methods.comparePassword = async function(plainTextPassword, dbPassword) {
    return await _security.bcrypt.compare(plainTextPassword, dbPassword)
}

//Final step
module.exports = mongoose.model("Account", accountSchema)