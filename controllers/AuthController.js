const {User} = require('../models/users')
const {Vendor} = require('../models/vendor')
const { ObjectId } = require('mongodb')


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
            name: 'Kunal sinha',
            email : 'Kunal@gmail.com',
            password: '12344324',
            place: 'delhi',
            coords: { lat: 28.6873898, lng:77.1431264 }
        });
        await vendor.save();
        res.json(vendor);
    },

    viewSignup: async (req, res) => {
        res.render('signup');  
    },

    viewLogin: async(req, res) => {
        res.render('login');
    }, 

    logout: async (req, res) => {
        if (req.session.user && req.cookies.user_sid) {
            res.clearCookie('user_sid');
            res.redirect('/');
        } else {
            res.redirect('/login');
        }
    }
}

let  isValidString = (str) => {
    return (typeof str === 'string') && (str.trim().length > 0)
}
