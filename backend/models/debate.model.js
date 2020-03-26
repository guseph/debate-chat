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
    proponent: {type: String, required: true},
    opponent: {type: String, required: true},
    date: {type: Date, required: true},
    conversation: {type:Array, required: true},
    closed: {type: Boolean, required: true}
} ,
{timestamps: true,}
);

// create a model using Debate
const User = mongoose.model('Debate', debateSchema);

module.exports = User;  // export Debate model