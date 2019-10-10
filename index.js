const express = require('express')
const app = express()
const {mongoose} = require('./config/mongoose')
const http = require('http');
const socketio = require('socket.io');
const server = http.createServer(app);

const io = socketio.listen(server);

app.use('/', require('./config/routes'));
app.set('view engine', 'ejs');

app.set('io', io);
app.set('server', server);

const port = process.env.PORT || 3000


app.listen(port, () => {
    console.log(`Server is up and running on ${port}`)
})

