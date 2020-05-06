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
    Posts.findById(req.params.id)
    .then(post => {
        if(post.length===0){
            res.status(404).json({
                status: 404,
                statusMsg: "Resource not found",
                errorMessage: "Post with specified ID does not exist"
            })
        }else if(!req.body.text){
            res.status(400).json({
                status: 400,
                statusMsg: "Bad Request",
                errorMessage: "Please provide text for comment"
            })
        }else{ Posts.insertComment(req.body)
            .then(comm => {
                res.status(201).json(comm)
            })
            .catch(err => {
                res.status(500).json({
                    errorMessage: "There was an error adding your comment",
                    error: err
                })
            })}
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
            res.status(200).json(post)

        }else{
            res.status(404).json({
                status: 404,
                statusMsg: "Resource not found",
                errorMessage: "item not found"
            })
        }
    })
    .catch(error => {
        res.status(500).json({
            errorMessage: "Error loading post",
            error: error.message
        })
    })
})

router.get('/:id/comments', (req, res) => {
    Posts.findById(req.params.id)
    .then(post => {
        if(post.length===0){
            res.status(404).json({
                status: 404,
                statusMsg: "Resource not found",
                errorMessage: "Post with specified ID does not exist"
            })
        }else{ 
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
    }
    })
})

router.delete('/:id', (req, res) => {
    let deletedPost = [];
    Posts.findById(req.params.id)
        .then(post => {
            deletedPost = post;
            Posts.remove(req.params.id)
                .then(count => {
                    if (count > 0) {
                        res.status(200).json(deletedPost);
                    } else {
                        res.status(404).json({
                            status: 404,
                            statusMsg: "Resource not found", 
                            errorMessage: "The post with the specified ID does not exist." 
                        });
                    }
                })
                .catch(error => {
                    res.status(500).json({
                        error: "The post could not be retrieved."
                    });
                })

        })
        .catch(error => {
            // log error to database
            console.log(error);
            res.status(500).json({
                error: "The post information could not be retrieved."
            });
        });

})

router.put('/:id', (req, res)=> {
    Posts.findById(req.params.id)
    .then(post => {
        if(post.length = 0){
            res.status(404).json({
                status: 404,
                statusMsg: "Resource not found",
                errorMessage: "Post with specified ID does not exist"
            })
        }else if(req.body.title.length == 0 || req.body.contents.length == 0){
            res.status(400).json({
                status: 404,
                statusMsg: "Bad Request",
                errorMessage: "Please provide title and contents for the post"
            })
        }else{
            Posts.update(req.params.id, req.body)
            .then(resp => {
                res.status(200).json({
                    status: 200,
                    statusMsg: "Updated Successfully"
                })
            })
            .catch(err=> {
                res.status(500).json(err)
            })
        } 
})
})


module.exports = router;