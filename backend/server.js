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

// listen for changes
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})