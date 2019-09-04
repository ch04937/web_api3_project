const express = require('express');

const users = require('../../data/seeds/02-users');

const router = express.Router();


router.post('/', (req, res) => {

});

router.post('/:id/posts', (req, res) => {

});

router.get('/',  (req, res) => {
    res.send(`get to /posts/`)
});

//get user by ID
router.get('/:id', validateUserId, (req, res) => {
    const id = req.params.id;
    userDb.getById(id)
        .then(user => {
            res.status(200).json(user)
        })
        .catch(error => {
            res.status(500).json({
                error: 'There was an error retrieving the user information.'
            })
        })
    });
router.get('/:id/posts', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

//custom middleware

function validateUserId(req, res, next) {
    if(id){
        const {id} = req.user
    }else{
        res.status(400).json({ message: "invalid user id" })
    };
    next();

};

function validateUser(req, res, next) {

};

function validatePost(req, res, next) {

};

module.exports = router;
