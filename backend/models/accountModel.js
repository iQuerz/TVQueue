const mongoose = require("mongoose")
const validator = require("validator")

const _security = require("../configs/security")
const _code = require("../helpers/statusCodes")
const _msg = require("../helpers/msg")
const _enum = require("../helpers/enums")

//Schema definition
const accountSchema = mongoose.Schema({
    email: { type: String, required: [true, _msg.requiredAccountEmail], unique: true, lowercase: true, validate: [validator.isEmail, _msg.invalidEmail] },
    name: { type: String, required: [true, _msg.requiredAccountName], index: true },
    password: { type: String, required: [true, _msg.requiredAccountPassword], select: false, minLength: 3 },
    picture: { type: String },
    roles: { 
        type: Map,
        of: Boolean,
        default: { admin: true, user: true },
        validate: {
            validator: function(val) {
                val.forEach((value, role) => {
                    if(!_enum.roles.type[role])
                        return false
                })
                return true
            },
            message: `Allowed types: ${_enum.toValueList(_enum.roles)}`
        },
        sparse: true
    },
    playlists: {
        type: [{
            name: { type: String, enum: _enum.toKeyList(_enum.playlists) },
            mediaRef: { type: mongoose.Types.ObjectId },
            mediaName: String,
            mediaPicture: String
        }],
        _id: false,
        default: undefined
    },
    reviews: {
        type: [{
            rating: Number,
            comment: String,
            _mediaId: { type: mongoose.Types.ObjectId, ref: "Media" }        
        }],
        default: undefined
    },

    followingTags: {
        type: [{
            _id: mongoose.Types.ObjectId,
            name: String           
        }],
        default: undefined
    }
},
{
    timestamps: true
})

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

    if(update.password) {
        const salt = await _security.bcrypt.genSalt(_security.bcryptSaltRounds)
        update.password = await _security.bcrypt.hash(update.password, salt)
    }

    next()    
})

//Post middleware

//Methods
accountSchema.methods.comparePassword = async function(plainTextPassword, dbPassword) {
    return await _security.bcrypt.compare(plainTextPassword, dbPassword)
}

//Final step
module.exports = mongoose.model("Account", accountSchema)