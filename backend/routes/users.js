// require files/tools
const router = require('express').Router();
let User = require('../models/user.model');

// endpoint
// handles incoming HTTP get requests
router.route('/').get((req, res) => {
    User.find()  // gets all users in database, returns promise
        .then(users => res.json(users))  // return all user information in json format
        .catch(err => res.status(400).json('Error: ' + err));  // otherwise error
});

// endpoint
// handles incoming HTTP post requests
router.route('/add').post((req, res) => {
    const username = req.body.username;  // grab username from req JSON
    
    const newUser = new User({username});  // create a new User

    newUser.save()  // new User is saved to database
        .then(() => res.json('User added!'))  // if successful, return message
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;  // exporting the router