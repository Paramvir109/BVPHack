const express = require('express')
const router = express.Router();

const PagesController = require('../controllers/PagesController')
const AuthController = require('../controllers/AuthController')
const UserController = require('../controllers/UserController')
const VendorController = require('../controllers/VendorController')

router.get('/', PagesController.index);
router.get('/signup', AuthController.viewSignup);
router.get('/login', AuthController.viewLogin);
router.get('/vendor/signup', AuthController.vendorSignup);
router.get('/dashboard', UserController.index);

router.get('/vendor/dashboard', VendorController.index);

module.exports = router;

