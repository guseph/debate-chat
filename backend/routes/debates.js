// require files/tools
const router = require('express').Router();
let Debate = require('../models/debate.model');

// endpoint
// handles HTTP GET requests
router.route('/').get((req, res) => {
    Debate.find()  // gets all users in database, returns promise
        .then(debates => res.json(debates))  // return something in json format
        .catch(err => res.status(400).json('Error: ' + err));  // otherwise error
});

// endpoint
// handles HTTP POST requests
router.route('/add').post((req, res) => {
    // grab data from req JSON
    const topic = req.body.topic;
    const users = req.body.users;
    const date = Date.parse(req.body.date);
    
    const newDebate = new Debate({topic, users, date});  // create a new Debate


    newDebate.save()  // new Debate is saved to database
        .then(() => res.json('Debate added!'))  // if successful, return message
        .catch(err => res.status(400).json('Error: ' + err));
});

// endpoint
// :id is a variable name, is just the id attached to the end of "host_url"/debates/
// handles HTTP GET requests with id
router.route('/:id').get((req, res) => {
    Debate.findById(req.params.id)
      .then(debate => res.json(debate))
      .catch(err => res.status(400).json('Error: ' + err));
});

// endpoint
// handles HTTP DELETE requests with id
router.route('/:id').delete((req, res) => {
    Debate.findByIdAndDelete(req.params.id)
        .then(() => res.json('Debate deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// endpoint
// handles HTTP POST requests with UPDATE and ID
router.route('/update/:id').post((req, res) => {
    Debate.findById(req.params.id)
        .then(debate => {
        debate.topic = req.body.topic;
        debate.users = req.body.users;
        debate.date = Date.parse(req.body.date);
        // currently updates all data, may refactor to be selective

        debate.save()
            .then(() => res.json('Debate updated!'))
            .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;  // exporting the router