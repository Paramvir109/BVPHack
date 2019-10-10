const express = require('express')
const app = express()
const {mongoose} = require('./config/mongoose')
var expressLayouts = require('express-ejs-layouts');

const port = process.env.PORT || 3000

app.use(expressLayouts);
app.use('/', require('./config/routes'));
app.use(express.static('public'));


app.set('view engine', 'ejs');



app.listen(port, () => { console.log(`Server is up and running on ${port}`)})

