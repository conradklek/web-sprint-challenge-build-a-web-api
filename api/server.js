const express = require('express')
const server = express()
const projectsRouter = require('./projects/projects-router')
const actionsRouter = require('./actions/actions-router')

const cors = require('cors')
server.use(express.json())
server.use(cors())

server.use('/api/projects', projectsRouter)
server.use('/api/actions', actionsRouter)

module.exports = server;
