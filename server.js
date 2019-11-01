const express = require('express');
const helmet = require('helmet');
const server = express();
const cors = require('cors');
const projectRouter = require('./data/helpers/projectRouter')
const actionRouter = require('./data/helpers/actionRouter');

server.use(helmet())
server.use(cors())
server.use(express.json())

server.use('/api/project', logger, projectRouter)
server.use('/api/action', logger, actionRouter)

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