// require mongoose
const mongoose = require('mongoose');

// Schema must be defined
const Schema = mongoose.Schema;

// create debateSchema
// this houses the data expected of a Debate
// ~~ Debate => topic, users, date
// ~~ future data: text_conversation (array of strings)
const debateSchema = new Schema({
    topic: {type: String, required: true},
    users: {type: Array, required: true},
    date: {type: Date, required: true},
} ,
{timestamps: true,}
);

// create a model using Debate
const User = mongoose.model('Debate', debateSchema);

module.exports = User;  // export Debate model