const {User} = require('../models/users')
const {Vendor} = require('../models/vendor')


module.exports = {
    signup: async (req, res) => {
        const user = new User({
            email : 'paramvirlod1ajs09@gmail.com',
            password: '12344324'
        });
        await user.save();
        res.json(user);
    },

    vendorSignup: async (req, res) => {
        const vendor = new Vendor({
            email : 'manishnahssmanishakjnsjssskjjn@gmail.com',
            password: '12344324',
            place: 'Delhi',
            coords: { lat: 28.6863898, lng:77.1421264 }
        });
        console.log(vendor);
        await vendor.save();
        res.json(vendor);
    },

    viewSignup: async (req, res) => {
        res.render('signup');
    },

    viewLogin: async(req, res) => {
        res.render('login');
    }
}