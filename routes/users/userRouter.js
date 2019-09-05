const express = require('express');
const User = require('./userDb.js');

const router = express.Router();


router.post('/', validateUser, (req, res) => {
    const user = req.body;
    User.insert(user)
    .then(user => {
        res.status(201).json(user);
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({error: 'error inserting user'})
    })
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


router.get('/:id/posts',validateUserId, (req, res) => {
    const { id } = req.params;
    User.getUserPosts(id)
    .then(post => {
        res.status(200).json(posts)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: 'error getting user post'})
    })
});

router.delete('/:id', validateUserId, (req, res) => {
    const { id } = req.user;
    User.remove(id)
    .then(() => {
        res.status(204).end()
    })
    .catch( err => {
        console.log(err);
        res.status(500).json({error: 'error deleting user'})
    })
});

router.put('/:id', validateUserId, (req, res) => {
    console.log('get user')
    const { id } = req.params;
    const { name } = req.body;
    User.update(id, {name})
    .then(updated => {
        if(updated){
            User.getById(id)
            .then(user => {
                res.status(200).json(user);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({error: 'error getting user'})
            })
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: 'error getting updating user'})
    })

});

//custom middleware

function validateUserId(req, res, next) {
    const { id } = req.params.id;
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
    const { name } = req.body;
    if(!name) {
        return res.status(400).json({error:'name required'})
    }
    if (typeof name !== 'string'){
        return res.status(400).json({error: 'name must be string'})
    }
    req.body = {name}
    next();

};

function validatePost(req, res, next) {

};

module.exports = router;
