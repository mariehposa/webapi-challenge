const express = require('express');
const actionDb = require('./actionModel');
const router = express.Router();

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

router.post('/', validateActionChanges, (req, res) => {
    const actionObject = {
        project_id: project_id,
        description: description,
        notes: notes
    }
    actionDb.insert(actionObject)
        .then(action => {
            res.status(201).json(action)
        })
        .catch(err => {
            res.status(500).json({
                message: "An error occured!"
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


module.exports = router;