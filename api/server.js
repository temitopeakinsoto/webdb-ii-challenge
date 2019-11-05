const express = require('express');
const helmet = require('helmet');


const server = express();

server.use(helmet());
server.use(express.json());

server.use('/', (req, res) => {
    res.status(200).json({message: "yaayyyy! our end point is up and running!!"});
});

module.exports = server;