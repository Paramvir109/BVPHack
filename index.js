const express = require('express')
const app = express()

app.use('/', require('./routes'));
app.set('view engine', 'ejs');

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Server is up and running on ${port}`)
})

