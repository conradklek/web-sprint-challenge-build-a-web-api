const express = require('express')
const router = express.Router()

const Projects = require('./projects-model')

const { projectsLogger, postValidator, putValidator } = require('../projects/projects-middleware')

router.get('/', projectsLogger, (req, res) => {
    Projects.get()
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'Failed to get projects' })
        })
})

router.get('/:id', (req, res) => {
    const { id } = req.params
    Projects.get(id)
        .then(project => {
            if (project) {
                res.status(200).json(project)
            } else {
                res.status(404).json({ message: 'Could not find project with given id' })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'Failed to get project' })
        })
})

router.post('/', postValidator, (req, res) => {
    const project = req.body
    Projects.insert(project)
        .then(project => {
            res.status(201).json(project)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'Failed to create project' })
        })
})

router.put('/:id', (req, res) => {
    const { id } = req.params
    const changes = req.body
    Projects.update(id, changes)
        .then(project => {
            if (project) {
                res.status(400).json(project)
            } else {
                res.status(404).json({ message: 'Could not find project with given id' })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(400).json({ message: 'Failed to update project' })
        })
})

router.delete('/:id', (req, res) => {
    const { id } = req.params
    Projects.remove(id)
        .then(count => {
            if (count > 0) {
                res.status(200).json({ message: 'Project successfully deleted' })
            } else {
                res.status(404).json({ message: 'Could not find project with given id' })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'Failed to delete project' })
        })
})

router.get('/:id/actions', (req, res) => {
    const { id } = req.params
    Projects.getProjectActions(id)
        .then(actions => {
            if (actions) {
                res.status(200).json(actions)
            } else {
                res.status(404).json([])
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'Failed to get actions' })
        })
})

module.exports = router