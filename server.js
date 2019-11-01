const express = require('express');
const helmet = require('helmet');
const server = express();

server.use(helmet())
server.use(express.json())

server.get('/', logger, (req, res) => {
    res.send('Its working!')
})

function logger(req, res, next) {
    console.log(req.method);
    console.log(req.url);
    console.log(Date.now())
    next()
}

module.exports = server;