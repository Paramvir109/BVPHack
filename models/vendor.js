const mongoose = require('mongoose')
const validator = require('validator')
const _ = require('lodash')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


var VendorSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        trim : true,
        minlength : 1,
        unique : true,
        validate : {
            validator : validator.isEmail,
            message : '{VALUE} is not a valid email'
        }
    },
    password : {
        type : String,
        required : true,
        minlength : 6,

    }
    
})

VendorSchema.methods.toJSON = function() {//Overrided method
    let userObject = this.toObject()
    return _.pick(userObject, ['email' , '_id'])//Only these props sent back
}



VendorSchema.statics.findByCredentials = async function(email, password) {
    let User = this;
    try {
        let user = await User.findOne({email})
        let res = await bcrypt.compare(password, user.password)
        if(res) {
            return user
        }
        throw new Error('Incorrect email or password')
    } catch (error) {
        throw new Error(error.message)
    }


}
VendorSchema.methods.generateAuthToken = function () {
    let user = this
    let access = 'auth'
    let token = jwt.sign({_id : user._id, access},process.env.JWT_SECRET).toString()
    return Promise.resolve(token)

}

VendorSchema.statics.findByToken =  function(token) {
    let User = this;
    let decoded
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
        return Promise.reject();
    }
    return User.findOne({
        '_id' : decoded._id,
    })

}


VendorSchema.pre('save', function(next) {//mongoose middleware
    var user = this//To get current instance 
    if(user.isModified('password')) {
        bcrypt.genSalt(10).then((salt) => {
            return bcrypt.hash(user.password, salt)
          }).then((hash) => {
            user.password = hash
            next()
          }).catch((e) =>{next(e)})
    }else {
        next();
    }
})
var Vendor = mongoose.model('User', VendorSchema)
module.exports = {Vendor}

