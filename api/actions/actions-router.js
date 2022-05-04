const express = require('express')
const router = express.Router()

const Actions = require('./actions-model')

router.get('/', (req, res) => {
    Actions.get()
        .then(actions => {
            res.status(200).json(actions)
        })
        .catch(err => {
            console.log(err)
            res.status(400).json({ message: 'Failed to get actions' })
        })
})

router.get('/:id', (req, res) => {
    const { id } = req.params
    Actions.get(id)
        .then(action => {
            if (action) {
                res.status(200).json(action)
            } else {
                res.status(404).json({ message: 'Could not find action with given id' })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(400).json({ message: 'Failed to get action' })
        })
})

router.post('/', (req, res) => {
    const action = req.body
    Actions.insert(action)
        .then(newAction => {
            res.status(201).json(newAction)
        })
        .catch(err => {
            console.log(err)
            res.status(400).json({ message: 'Failed to add action' })
        })
})

router.put('/:id', (req, res) => {
    const { id } = req.params
    const changes = req.body
    Actions.update(id, changes)
        .then(updatedAction => {
            if (updatedAction) {
                res.status(200).json(updatedAction)
            } else {
                res.status(404).json({ message: 'Could not find action with given id' })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(400).json({ message: 'Failed to update action' })
        })
})

router.delete('/:id', (req, res) => {
    const { id } = req.params
    Actions.remove(id)
        .then(count => {
            if (count > 0) {
                res.status(200).json({ message: 'Action successfully deleted' })
            } else {
                res.status(404).json({ message: 'Could not find action with given id' })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(400).json({ message: 'Failed to delete action' })
        })
})

module.exports = router