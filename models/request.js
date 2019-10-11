const mongoose = require('mongoose')
const {ObjectId} = require('mongodb')

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
    vendor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vendor'
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
    
RequestSchema.statics.findById = async function(id) {
    let Request = this;
    try {
        let query = await Request.findOne({_id : ObjectId(id)})
        
        if(query) {
            return query
        }
    } catch (error) {
        throw new Error(error.message)
    }
}
    

RequestSchema.methods.approve = async function(req, res) {
    let req = this;
    try {
        req.approval = true;
        await req.save();
        if(request) {
            return
        }
    } catch (error) {
        throw new Error(error.message)
    }

}
var Request = mongoose.model('Request', RequestSchema)
module.exports = {Request}

