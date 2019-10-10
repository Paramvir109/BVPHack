const express = require('express')
const app = express()
const {mongoose} = require('./config/mongoose')
const expressLayouts = require('express-ejs-layouts');
const port = process.env.PORT || 3000
const http = require('http');
const socketio = require('socket.io');
const server = http.createServer(app);

const io = socketio.listen(server);

app.use(expressLayouts);
app.use('/', require('./config/routes'));
app.use(express.static('public'));

app.set('view engine', 'ejs');

app.set('io', io);
app.set('server', server);


const UserController = require('./controllers/UserController')

io.on('connection', (socket) => {
    socket.on('find-vendors', (params,callback) => { UserController.callForService(params, callback) })
})


server.listen(port, () => { console.log(`Server is up and running on ${port}`)})

