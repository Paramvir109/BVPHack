const express = require('express')
const router = express.Router();

router.get('/', (rqe,res) => {
    res.send('HI');
})
router.get('/vendor/dashboard', (req, res) => {
    res.send('Vendor page');
})
router.get('/dashboard', (req, res) => {
    res.send('User page');
})

module.exports = router;

