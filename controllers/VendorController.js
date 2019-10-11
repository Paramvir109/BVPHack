const {Request} = require('./../models/request')
const {Vendor} = require('./../models/vendor');

const {ObjectId} = require('mongodb');

module.exports = {

    index: async (req, res) => {
        // vendor dashboard rendering 
        res.render('vendorDashboard')
    },

    joinRoom: async (req, res) => {
        const io = req.app.get('io');
        io.on('connection', (socket) => {
            
        })

    },

    indexRequest: async (params, callback) => {
        const list = await Request.findUnApproved();
        callback(list);
    },

    signup: async (req, res) => {

    },

    findById: async (id) => {
        const result = await Vendor.findById(ObjectId(id))
        return result;
    }


}