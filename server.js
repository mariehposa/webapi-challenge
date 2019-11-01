const express = require('express');
const helmet = require('helmet');
const server = express();
const cors = require('cors');
const projectRouter = require('./data/helpers/projectRouter')
const actionRouter = require('./data/helpers/actionRouter');

server.use(helmet())
server.use(cors())
server.use(express.json())
server.use(express.static(__dirname + '/client/build'))

server.use('/api/project', logger, projectRouter)
server.use('/api/action', logger, actionRouter)

server.get('/', (req, res) => {
    res.sendFile(__dirname + '/client/build/index.html')
    console.log("its working")
})

function logger(req, res, next) {
    console.log(req.method);
    console.log(req.url);
    console.log(Date.now())
    next()
}

module.exports = server;