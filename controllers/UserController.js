const {User} = require('../models/users')
const {Vendor} = require('../models/vendor')
const {Request} = require('../models/request')
const {ObjectId} = require('mongodb')

module.exports = {
    index: async (req, res) => {
        const user_email = req.session.user.email
        let user = await User.findByEmail(user_email);
        res.render('dashboard', {user: user});
    },

    createRequest: async (params) => {
        const request = new Request({
            problemType : params.problem_type,
            nearby: params.nearby,
            location : params.location,
            coords: params.coords,
            _creator : ObjectId(params.id)
        })
        await request.save()
        return request;
    },

    getListOfVendors: async (params) => {
        let list = await Vendor.getListByPlace(params);
        return list;
    }


}