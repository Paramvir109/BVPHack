const express = require('express')
const router = express.Router();

const PagesController = require('../controllers/PagesController')
const AuthController = require('../controllers/AuthController')
const UserController = require('../controllers/UserController')

router.get('/', PagesController.index);
router.get('/signup', AuthController.signup)

router.get('/dashboard', UserController.index)


router.get('/vendor/dashboard', (req, res) => {
    res.send('Vendor page');
})

module.exports = router;

