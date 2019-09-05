const express = require('express');

const User = require('./userDb.js');

const router = express.Router();


router.post('/', (req, res) => {

});

router.post('/:id/posts', (req, res) => {

});

router.get('/',  (req, res) => {
    User.get()
    .then( users => {
        res.status(200).json(users);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: 'error getting users'});
    })
});

//get user by ID
router.get('/:id', validateUserId, (req, res) => {
    res.status(200).json(req.user)
    //dont need this because we can assume the middleware function already has the info required
    // const { id } = req.params;
    // User.getById(id)
    //     .then(user => {
    //         if(user){
    //             res.status(200).json(user)
    //         }else{
    //             res.status(404).json({error: 'user with id does not match'})
    //         }
    //     })
    });


router.get('/:id/posts', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', validateUserId, (req, res) => {
    console.log('get user')
    const { id } = req.params;
    // const { name } = req.body;
    User.getById(id)
    .then(user => {
        if(user){
            User.update(id, { name })
            .then(updated => {
                res.status(200).json(updated);
            })
        }else{
            res.status(404).json({error: 'user with that id odes not exist'})
        }
    })

});

//custom middleware

function validateUserId(req, res, next) {
    const { id } = req.params.kd;
    User.getById(id)
    .then(user => {
        if(user){
            req.user = user;
            next();
        }else{
            res.status(400).json({ message: "invalid user id" })
        };

    })

};

function validateUser(req, res, next) {

};

function validatePost(req, res, next) {

};

module.exports = router;
