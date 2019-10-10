const {User} = require('../models/users')
const {Vendor} = require('../models/vendor')
const {Request} = require('../models/request')

module.exports = {
    index: async (req, res) => {
        res.render('dashboard');
    },

    callForService: async (params, callback) => {
        // crate a request in db
        const request = new Request({
            problemType : params.problem_type,
            location : params.location,
            _creator : params.u_id
        })
        await request.save()

        // send this request to vendors 

        // return a list of vendors 
        let list = await Vendor.getListByPlace(params.place);
        console.log(list);
        callback(list)
    }
}