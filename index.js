const express = require('express');
const colors = require('colors');
const cors = require('cors');

const server = express();
const PORT = 4302;

server.use(express.json());
server.use(cors());

server.listen(PORT, () => {
    console.log(`\n === SERVER LISTENING ON PORT ${PORT} === \n`.bgWhite.magenta.bold)
})

server.get('/', (req, res)=> {
    res.status(200).json({
        message: "API is Online"
    })
})