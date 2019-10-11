const express = require('express')
const app = express()
const {mongoose} = require('./config/mongoose')
const expressLayouts = require('express-ejs-layouts');
const port = process.env.PORT || 3000
const http = require('http');
const socketio = require('socket.io');
const server = http.createServer(app);
const io = socketio.listen(server);

const PagesController = require('./controllers/PagesController')
const AuthController = require('./controllers/AuthController')
const UserController = require('./controllers/UserController')
const VendorController = require('./controllers/VendorController')

const { Request } = require('./models/request');

// 
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

// app.configure(() => {
    // app.user(express.bodyParser)
// })

process.env.JWT_SECRET = "bitchesbebitches"

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(expressLayouts);
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(session({
    key: 'user_sid',
    secret: 'somerandonstuffs',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));

app.use((req, res, next) => {
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');        
    }
    next();
});

var sessionChecker = (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
        res.redirect('/dashboard');
    } else {
        next();
    }    
};

var isAuth = (req, res, next) => {
    if(req.session.user) next();
    else res.redirect('/login')
} 

//  Routes
app.get('/', PagesController.index);
app.post('/login', AuthController.login);
app.post('/signup', AuthController.signup);
app.get('/signup',sessionChecker, AuthController.viewSignup);
app.get('/login', sessionChecker, AuthController.viewLogin);
app.get('/vendor/signup', AuthController.vendorSignup);
app.get('/dashboard', isAuth, UserController.index);

app.get('/vendor/dashboard', VendorController.index);

app.get('/logout', AuthController.logout);


app.set('io', io);
app.set('server', server);

app.use(bodyParser.json({ type: 'application/*+json' }))
app.use(bodyParser.urlencoded({ extended: false }))



io.on('connection', (socket) => {
    socket.on('find-vendors', async (params,callback) => { 
        let room = params.location.toLowerCase();

        let request = await UserController.createRequest(params) 

        let list = await UserController.getListOfVendors(room);

        socket.join(params.id);



        io.to(room).emit('send-request', request);

        callback(list);

    });

    socket.on('get-requests', (params = {},callback) => {
        VendorController.indexRequest(params, callback)
    });

    socket.on('join-room', (params,callback) => {
        if(params.room) {
            let room = params.room.toLowerCase()

            socket.join(room)
            
            callback('joined room')
        }
        else {
            callback('Name and roomname are required')
        }
    });

    socket.on('request-apporved', async  (params, callback) => {
        console.log(params.request_id);
        const vendor = await VendorController.findById(params.vendor_id);
        const request = await Request.findById(params.request_id);
        console.log(request);
        //await request.approve();

        io.to(params.request_id).emit('vendor-found', vendor);
    });
})


server.listen(port, () => { console.log(`Server is up and running on ${port}`)})

