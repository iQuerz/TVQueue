const mongoose = require("mongoose")
const validator = require("validator")

const _security = require("../configs/security")
const _code = require("../helpers/statusCodes")
const _msg = require("../helpers/msg")
const _role = require("../helpers/roles")

//Schema definition
const accountSchema = mongoose.Schema({
    email: { type: String, required: [true, _msg.requiredAccountEmail], unique: true, lowercase: true, validate: [validator.isEmail, _msg.invalidEmail] },
    name: { type: String, required: [true, _msg.requiredAccountName] },
    password: { type: String, required: [true, _msg.requiredAccountPassword], select: false, minLength: 3 },
    picture: { type: String, default: "/avatars/chick.jpg" },
    roles: { 
        type: Map,
        of: Boolean,
        default: { admin: true },
        validate: {
            validator: function(val) {
                const role = val.entries().next().value[0]
                return Object.values(_role).includes(role)
            },
            message: `Allowed types: ${Object.values(_role)}`
        }
    }
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

//Post middleware

//Methods
accountSchema.methods.comparePassword = async function(plainTextPassword, dbPassword) {
    return await _security.bcrypt.compare(plainTextPassword, dbPassword)
}

//Final step
module.exports = mongoose.model("Account", accountSchema)