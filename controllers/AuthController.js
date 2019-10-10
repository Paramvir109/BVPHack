const {User} = require('../models/users')
const {Vendor} = require('../models/vendor')


module.exports = {
    signup: async (req, res) => {
        const user = new User({
            name: req.body.name,
            email : req.body.email,
            password: req.body.password,
        });
        await user.save();

        if(user) {
            req.session.user = user;
            return res.redirect('/dashboard');
        }
        res.redirect('/login');
        
    },
    login : async(req,res) => {
        if(isValidString(req.body.email) && isValidString(req.body.password)) {
            try {
                let user = await User.findByCredentials(req.body.email, req.body.password)

                if(user) {
                    req.session.user = user;
                    res.redirect('/login');   
                }
                else {
                    res.redirect('/login');
                } 
            } catch (error) {
                return res.send(error.message)
            }        
        }
        else return res.redirect('login');
    },

    vendorSignup: async (sreq, res) => {
        const vendor = new Vendor({
            email : 'manishnahssmanishakjnsjssskjjn@gmail.com',
            password: '12344324',
            place: 'Delhi',
            coords: { lat: 28.6863898, lng:77.1421264 }
        });
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
