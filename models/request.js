const mongoose = require('mongoose')

var RequestSchema = new mongoose.Schema({
    approval:{
        type: Boolean,
        required: true,
        default : false
    },
    problemType : {
        type : String,
        required : true
    },
    nearby: {
        type: String,
        required: true
    },
    location : {
        type : String,
        required : true
    },
    _creator : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    coords: {
        lat: {
            type: Number,
            required: true
        },
        lng: {
            type: Number
        }
    }
    
})
RequestSchema.statics.findUnApproved = async function(req, res) {
    let Request = this;
    try {
        let query = await Request.find({approval : false})

        
        if(query) {
            return query
        }
    } catch (error) {
        throw new Error(error.message)
    }


}

var Request = mongoose.model('Request', RequestSchema)
module.exports = {Request}

