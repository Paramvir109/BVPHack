const path = require('path')

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

let publicPath = path.join(__dirname, '..','/public')
const port = process.env.PORT || 3000

const app = express()
// app.use(express.static(publicPath))
app.use('/', router);


app.listen(port, () => {
    console.log(`Server is up and running on ${port}`)
})

