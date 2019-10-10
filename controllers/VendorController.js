const {Request} = require('./../models/request')
module.exports = {

    index: async (req, res) => {
        // vendor dashboard rendering 
        res.send('vendor dashboard');
    },

    joinRoom: async (req, res) => {
        // room join 
        //const room = req.city;
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

    indexRequest: (req, res) => {
        res.json(Request.findApproved());
    }


}