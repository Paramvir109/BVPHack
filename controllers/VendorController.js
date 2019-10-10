const {Request} = require('./../models/request')

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

    }


}