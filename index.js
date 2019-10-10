const express = require('express')
const app = express()
const {mongoose} = require('./config/mongoose')


app.use('/', require('./config/routes'));
app.set('view engine', 'ejs');

const port = process.env.PORT || 3000


app.listen(port, () => {
    console.log(`Server is up and running on ${port}`)
})

