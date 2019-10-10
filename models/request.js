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
RequestSchema.statics.findApproved = async function() {
    let Request = this;
    try {
        let query = await User.find({approval : true})
        
        if(res) {
            return query
        }
        throw new Error('No active requests')
    } catch (error) {
        throw new Error(error.message)
    }


}

var Request = mongoose.model('Request', RequestSchema)
module.exports = {Request}

