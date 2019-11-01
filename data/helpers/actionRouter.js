const express = require('express');
const actionDb = require('./actionModel');
const router = express.Router();

const projectDb = require('./projectModel');


router.get('/', (req, res) => {
    actionDb.get()
        .then(actions => {
            res.status(200).json(actions)
        })
        .catch(err => {
            res.status(500).json({
                message: `An error occured ` + err
            })
        })
})

router.get('/:id', validateActionId, (req, res) => {
    actionDb.get(req.action.id)
        .then(project => {
            res.status(200).json(project)
        })
        .catch(err => {
            res.status(500).json({
                message: "An error occured!"
            })
        })
})

router.post('/', [validateProjectId, validateActionChanges], (req, res) => {
    const actionObject = {
        project_id: req.body.project_id,
        description: req.body.description,
        notes: req.body.notes
    }
    actionDb.insert(actionObject)
        .then(action => {
            res.status(201).json(action)
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            })
        })
})

router.put('/:id', validateActionId, validateActionChanges, (req, res) => {
    actionDb.update(req.action.id, req.body)
        .then(actionInfo => {
            res.status(200).json(actionInfo)
        })
        .catch(error => {
            res.status(400).json({
                message: "missing required fields"
            })
        })
})

router.delete('/:id', validateActionId, (req, res) => {
    actionDb.remove(req.action.id)
        .then(action => {
            res.status(200).json(action)
        })
        .catch(err => {
            res.status(500).json({
                message: "An error occured!"
            })
        })
})

function validateActionId(req, res, next) {
    const { id } = req.params;
    actionDb.get(id)
        .then(action => {
            if (action) {
                req.action = action
                next()
            } else {
                res.status(400).json({
                    message: "invalid action id"
                })
            }
        })
        .catch(err => {
            res.status(404).json({
                message: "id not found"
            })
        })
}

function validateActionChanges (req, res, next) {
    if (Object.keys(req.body).length) {
        if(req.body.project_id && req.body.description && req.body.notes) {
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

function validateProjectId(req, res, next) {
    const id = req.body.project_id;
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