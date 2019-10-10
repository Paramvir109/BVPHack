const mongoose = require('mongoose')

var RequestSchema = new mongoose.Schema({
    approval:{
        type: Boolean,
        required: true
    },
    problemType : {
        type : String,
        required : true
    },
    location : {
        type : String,
        required : true
    },
    creator : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    }
    
})
RequestSchema.statics.findApproved = async function(req, res) {
    let Request = this;
    try {
        let query = await Request.find({approval : true})
        console.log(query); 
        
        if(res) {
            return query
        }
    } catch (error) {
        throw new Error(error.message)
    }


}

var Request = mongoose.model('Request', RequestSchema)
module.exports = {Request}

