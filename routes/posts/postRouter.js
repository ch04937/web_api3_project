const express = require('express');

//import postDb.js to get the info from that file
const db = require('./postDb')
const router = express.Router();

// route with a middleware that only applies that this route
router.use(express.json());

//GET to /posts/
router.get('/', (req, res) => {
    db.res.send(`get to /posts/`)
});

router.get('/:id', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

// custom middleware

function validatePostId(req, res, next) {

};

module.exports = router;