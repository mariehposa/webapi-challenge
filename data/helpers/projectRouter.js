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

function validateId() {
    const { id } = req.params;
}

module.exports = router;