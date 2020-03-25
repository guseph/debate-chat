// require files/tools
const router = require('express').Router();
let User = require('../models/user.model');

// endpoint
// Gets all Users
router.route('/').get((req, res) => {
    User.find()  // gets all users in database, returns promise
        .then(users => res.json(users))  // return all user information in json format
        .catch(err => res.status(400).json('Error: ' + err));  // otherwise error
});

// endpoint
// Posts a new User
router.route('/add').post((req, res) => {
    console.log("Called backend routea");
    const username = req.body.username;  // grab username from req JSON
    
    const newUser = new User({username});  // create a new User

    newUser.save()  // new User is saved to database
        .then(() => res.json('User added!'))  // if successful, return message
        .catch(err => res.status(400).json('Error: ' + err));
});

// endpoint
// Updates all components of a User by its _id
router.route('/update/:id').post((req, res) => {
    User.findById(req.params.id)
        .then(user => {
        user.username = req.body.username;
        // currently updates all data, may refactor to be selective

        user.save()
            .then(() => res.json('Debate updated!'))
            .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;  // exporting the router