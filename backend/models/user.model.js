// require mongoose
const mongoose = require('mongoose');

// Schema must be defined
const Schema = mongoose.Schema;

// create userSchema
// this houses the data expected of a User
// ~~ User => username
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
} ,
{timestamps: true,}
);

// create a model using User
const User = mongoose.model('User', userSchema);

module.exports = User;  // export User model