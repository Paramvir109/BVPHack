const {User} = require('../models/users')
const {Vendor} = require('../models/vendor')

module.exports = {
    index: async (req, res) => {
        res.render('dashboard');
    },

    callForService: async (params, callback) => {
        // crate a request in db

        // send this request to vendors 

        // return a list of vendors 
        let list = await Vendor.getListByPlace(params.place);
        console.log(list);
        callback(list)
    }
}