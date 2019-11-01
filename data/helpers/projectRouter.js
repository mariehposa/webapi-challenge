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

router.delete('/:id', validateId, (req, res) => {
    projectDb.remove(req.project.id)
        .then(project => {
            res.status(200).json(project)
        })
        .catch(err => {
            res.status(500).json({
                message: "An error occured!"
            })
        })
})

router.put('/:id', validateId, validateChanges, (req, res) => {
    projectDb.update(req.project.id, req.body)
        .then(userInfo => {
            res.status(200).json(userInfo)
        })
        .catch(error => {
            res.status(400).json({
                message: "missing required field"
            })
        })
})

router.post('/', validateChanges, (req, res) => {
    const projectObject = {
        name: req.body.name,
        description: req.body.description
    }
    projectDb.insert(projectObject)
    .then(post => {
        res.status(201).json(post)
    })
    .catch(err => {
        res.status(500).json({
            message: "An error occured!"
        })
    })
})

router.get('/:id/actions', validateId, (req, res) => {
    projectDb.getProjectActions(req.project.id)
        .then(action => {
            res.status(200).json(action)
        })
        .catch(err => {
            res.status(500).json(err)
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

function validateChanges (req, res, next) {
    if (Object.keys(req.body).length) {
        if(req.body.name && req.body.description) {
            next ()
        } else {
            res.status(400).json({
                message: "missing required fields"
            })
        }
    } else {
        res.status(400).json({
            message: "missing required data"
        })
    }
}

module.exports = router;