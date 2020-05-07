const express = require('express');
const colors = require('colors');
const PostsRouter = require('./posts-routes')

const server = express();
const port = process.env.PORT || 4403;

server.use(express.json());

server.listen(port, () => {
    console.log(`\n === SERVER LISTENING ON PORT ${port} === \n`.bgWhite.red.bold)
})

server.get('/', (req, res)=> {
    res.status(200).json({
        status: 200,
        url: "/",
        message: "API is Online",
        query: req.query,
        params: req.params,
        headers: req.headers

    })
})

server.use('/api/posts', PostsRouter);