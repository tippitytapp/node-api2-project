const router = require('express').Router();
const Posts = require('./data/db.js')


router.post('/', (req, res) => {
    if(req.body.title.length == 0 || req.body.contents.length == 0){
        res.status(400).json({
            status: 400,
            statusMsg: 'Bad Request',
            errorMessage: "Please provide the title and contents for the post"
        })
    }else{
    Posts.insert(req.body)
    .then(post => {
        res.status(201).json({
            post: post
        })
    })
    .catch(error => {
        res.status(500).json({
            message: 'Error adding the post',
            error: error
        })
    })
}
})

router.post("/:id/comments", (req, res) => {
    Posts.insertComment(req.body)
    .then(comm => {
        res.status(201).json(comm)
    })
    .catch(err => {
        res.status(404).json({
            errorMessage: "There was an error adding your comment",
            error: err
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

router.get('/:id', (req, res) => {
    Posts.findById(req.params.id)
    .then(post => {
        if(post.length != 0){
            res.status(200),json(post)

        }else{
            res.status(404).json({
                errorMessage: "item not found"
            })
        }
    })
    .catch(error => {
        res.status(500).json({
            errorMessage: "Error loading post",
            error: error
        })
    })
})

router.get('/:id/comments', (req, res) => {
    Posts.findPostComments(req.params.id)
    .then(comments => {
        res.status(200).json({
            data: comments
        })
    })
    .catch(error => {
        res.status(500).json({
            errorMessage: "Error Loading Comments",
            error: error
        })
    })
})

// router.delete('/:id', (req, res)=>{
//     const id = req.params.id
//     const deletedPost = Posts.findById(id)
//     Posts.remove(id)
//     .then(resp => {
//         res.status(204).json({
//             deleted: deletedPost,
//             numberOfPostsDeleted: resp
//         })
//     })
// })


module.exports = router;