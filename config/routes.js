const express = require('express')
const router = express.Router();



const PagesController = require('../controllers/PagesController')
const AuthController = require('../controllers/AuthController')

router.get('/', PagesController.index);
router.get('/signup', AuthController.signup)

router.get('/vendor/dashboard', (req, res) => {
    res.send('Vendor page');
})
router.get('/dashboard', (req, res) => {
    res.send('User page');
})

module.exports = router;

