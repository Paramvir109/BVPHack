const {User} = require('../models/users')
const {Vendor} = require('../models/vendor')


module.exports = {
    signup: async (req, res) => {
        const user = new User({
            email : req.body.email,
            password: req.body.password
        });
        await user.save();
        res.redirect('/login');
    },
    login : async(req,res) => {
        if(isValidString(req.body.email) && isValidString(req.body.password)) {
            try {
                let user = await User.findByCredentials(req.body.email, req.body.password)
                if(user) {
                    let token = await user.generateAuthToken()
                    res.send(token);                    
                }
            } catch (error) {
                return res.send(error.message)
            }        
        }
        return callback('Enter valid id and password')
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

let  isValidString = (str) => {
    return (typeof str === 'string') && (str.trim().length > 0)
}
