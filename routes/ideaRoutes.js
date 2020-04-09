const router = require('@feathersjs/express').Router()

const { Idea } = require('../models')

router.get('/ideas', (req, res) => {
    Idea.find()
        .then(ideas => res.json(ideas))
        .catch(e => console.error(e))
})

router.post('/ideas', (req, res) => {
    Idea.create({
        idea: req.body.idea,
        tech: req.body.tech,
        name: req.body.name
    })
        .then( (idea) => {
            res.json(idea)
            res.sendStatus(200)
        })
        .catch(e => console.error(e))
})

router.delete('/ideas/:id', (req, res) => {
    Idea.findByIdAndDelete(req.params.id)
        .then(() => res.sendStatus(200))
        .catch(e => console.error(e))
})

module.exports = router