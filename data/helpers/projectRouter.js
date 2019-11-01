const express = require('express');
const projectDb = require('./projectModel');

const router = express.Router();

router.get('/', (req, res) => {
    projectDb.get()
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch(err => {
            res.status(500).json({
                message: "An error occured!"
            })
        })
})

router.get('/:id', validateId, (req, res) => {
    projectDb.get(req.project.id)
        .then(project => {
            res.status(200).json(project)
        })
        .catch(err => {
            res.status(500).json({
                message: "An error occured!"
            })
        })
})

function validateId(req, res, next) {
    const { id } = req.params;
    projectDb.get(id)
        .then(project => {
            if (project) {
                req.project = project
                next()
            } else {
                res.status(400).json({
                    message: "invalid user id"
                })
            }
        })
        .catch(err => {
            res.status(404).json({
                message: "id not found"
            })
        })
}

module.exports = router;