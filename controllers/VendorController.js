const {Request} = require('./../models/request')

module.exports = {

    index: async (req, res) => {
        // vendor dashboard rendering 
        res.render('vendorDashboard')
    },

    joinRoom: async (req, res) => {
        const io = req.app.get('io');
        io.on('connection', (socket) => {
            socket.on('joinVendorRoom', (params,callback) => {
                if((params.name) && (params.room)) {
                    let room = params.room.toLowerCase()
                    callback()
                    socket.join(room)
                    io.to(room).emit('updateUserList' , users.getUserList(room))
        
                    socket.broadcast.to(room).emit('newMessage' , 
                        generateMessage('Admin' , `${params.name} has joined the room`))
                }
                else {
                    callback('Name and roomname are required')
                }
            })
        })

    },

    indexRequest: async (params, callback) => {
        const list = await Request.findApproved();
        console.log(list);
        callback(list);
    },

    signup: async (req, res) => {

    }


}