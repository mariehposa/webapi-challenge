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

module.exports = router;