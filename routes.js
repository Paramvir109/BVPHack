const express = require('express')
const router = express.Router();
const {User} = require('./models/users')
const PagesController = require('./controllers/PagesController')

router.get('/', PagesController.index);
router.get('/signup', async (req,res) => {
    const user = new User({
        email : 'paramvir109@gmail.com',
        password: '12344324'
    })
    await user.save();
    res.json(user);

})
router.get('/vendor/dashboard', (req, res) => {
    res.send('Vendor page');
})
router.get('/dashboard', (req, res) => {
    res.send('User page');
})

module.exports = router;

