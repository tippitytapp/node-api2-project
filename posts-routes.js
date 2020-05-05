const router = require('express').Router();
const Posts = require('./data/db.js')


router.post('/', (req, res) => {
    Posts.insert(req.body)
    .then(post => {
        res.status(201).json(post)
    })
    .catch(error => {
        res.status(500).json({
            message: 'Error adding the post',
            error: error
        })
    })
})



router.get('/', (req, res) => {
    Posts.find(req.query)
    .then(posts => {
        res.status(200).json(posts)
    })
    .catch(error => {
        res.status(500).json({
            message: 'Error retrieving the posts',
            error: error
        });
    });
});



module.exports = router;