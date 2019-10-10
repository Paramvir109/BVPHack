const {User} = require('../models/users')


module.exports = {
    signup: async (req, res) => {
        const user = new User({
            email : 'paramvirlod109@gmail.com',
            password: '12344324'
        });
        await user.save();
        res.json(user);
    }
}