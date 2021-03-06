// require files/tools
const router = require('express').Router();
let Debate = require('../models/debate.model');

// GET endpoint
// gets all Debates
router.route('/').get((req, res) => {
    Debate.find()  // gets all users in database, returns promise
        .then(debates => res.json(debates))  // return something in json format
        .catch(err => res.status(400).json('Error: ' + err));  // otherwise error
});

// GET endpoint
// Posts a new Debate
router.route('/add').post((req, res) => {
    // grab data from req JSON
    const topic = req.body.topic;
    const proponent = req.body.proponent;
    const opponent = req.body.opponent;
    const date = Date.parse(req.body.date);
    const conversation = req.body.conversation;
    const closed = req.body.closed;
    
    const newDebate = new Debate({topic, proponent, opponent, date, conversation, closed});  // create a new Debate


    newDebate.save()  // new Debate is saved to database
        .then(() => res.json('Debate added!'))  // if successful, return message
        .catch(err => res.status(400).json('Error: ' + err));
});

// GET endpoint
// :id is a variable name, is just the id attached to the end of "host_url"/debates/
// Gets information about a specific Debate by _id
router.route('/:id').get((req, res) => {
    Debate.findById(req.params.id)
      .then(debate => res.json(debate))
      .catch(err => res.status(400).json('Error: ' + err));
});

// DELETE endpoint
// Deletes a Debate by its _id
router.route('/:id').delete((req, res) => {
    Debate.findByIdAndDelete(req.params.id)
        .then(() => res.json('Debate deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// POST endpoint
// Updates all components of a Debate by its _id
router.route('/update/:id').post((req, res) => {
    Debate.findById(req.params.id)
        .then(debate => {
        debate.topic = req.body.topic;
        debate.proponent = req.body.proponent;
        debate.opponent = req.body.opponent;
        debate.date = Date.parse(req.body.date);
        debate.conversation = req.body.conversation;
        debate.closed = req.body.closed;
        // currently updates all data, may refactor to be selective

        debate.save()
            .then(() => res.json('Debate updated!'))
            .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

// GET endpoint
// :id is a variable name, is just the id attached to the end of "host_url"/debates/
// Gets information about the conversation of a Debate by _id
router.route('/convo/:id').get((req, res) => {
    Debate.findById(req.params.id)
      .then(conversation => res.json(conversation))
      .catch(err => res.status(400).json('Error: ' + err));
});

// POST endpoint
// Updates only a debate's conversation parameter via _id
// Note the url path is slightly different
router.route('/update/convo/:id').post((req, res) => {
    Debate.findById(req.params.id)
        .then(debate => {
            debate.conversation.push(req.body.userInputTuple);  // push the new line onto the array, so conflicts don't happen
            // issue was updating one socket caused the other to be overriden

            debate.save()
                .then(() => res.json('Debate updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
})


// POST endpoint
// Updates only a debate's closed parameter via _id
// Note the url path is slightly different
router.route('/update/closed/:id').post((req, res) => {
    Debate.findById(req.params.id)
        .then(debate => {
            debate.closed = req.body.closed;

            debate.save()
                .then(() => res.json('Debate updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;  // exporting the router