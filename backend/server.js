// Require tools
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// for global environment variable in .env file
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;  // short circuiting, give port in .env or default 5000

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;  // uses MongoDB connection string, accessing admin user guseph:guseph
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});  // connects to MongoDB server

const connection = mongoose.connection;  // connection as a variable
connection.once('open', () => {
    console.log("MongoDB database connection established successfully.");
})

// requires files for pathing to backend
const debatesRouter = require('./routes/debates');  // plural is important
const usersRouter = require('./routes/users');

// reroutes the links to these files with endpoints, built off host url
app.use('/debates', debatesRouter);
app.use('/users', usersRouter);



// // ORIGINAL WITHOUT CHATBOX
// app.listen(port, () => {
//     console.log(`Server is running on port: ${port}, through Express`);
// });


// // SAME PORTS
let server = app.listen(port, () => {
    console.log(`Server is running on port: ${port}, through Express.`);
    console.log(`HTTP Server also running on port ${port}`);
})

let io = require('socket.io')(server);  // exposes socket.io for server to use

io.on('connection', function (socket) {  // upon successful connection, do/listen for following
    console.log("a user connected (server)")  // currently two sockets are created per tab, which is weird. May have to do with how we have io and chatSocket as instance variables
    socket.on('newMessage', function (data) {
        console.log(data)
        // socket.to(data.debateID).emit('updateChatbox');   if rooms are successful, emit to just the room
        io.emit('updateChatbox');
        io.emit('updateChatbox');
        io.emit('updateChatbox');  // probably not the best solution, but the chats are updating inconsistently
    });
    socket.on('joinDebate', function (data) {
        // console.log(data)  // should be debateID, will be used as the unique room identifier
        // socket.join(data.debateID);   to join a specific room, may make them namespaces instead?
    })
    // socket.on('leaveDebate', function(data){  // shouldn't need this, sockets automatically clean up
    //     socket.leave(data.debateID);
    // })
    socket.on('disconnect', function (data) {
      console.log("a user disconnected (server)");
    });
});
