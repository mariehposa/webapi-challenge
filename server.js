const express = require('express');
const helmet = require('helmet');
const server = express();

server.use(helmet())
server.use(express.json())

function logger(req, res, next) {
    console.log(req.method);
    console.log(req.url);
    console.log(Date.now())
    next()
}