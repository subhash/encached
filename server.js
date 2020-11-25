const express = require('express')
const bodyParser = require('body-parser')
const server = express()
const port = 4000

server.use(bodyParser.json())
// for pretty JSON
// server.set('json spaces', 2)

const fetch = require('./encached/fetch')
const add = require('./encached/add')

server.get('/encached/:key', fetch)
server.put('/encached/:key', add)

server.listen(port, () => console.log(`Server running at ${port}`))

module.exports = server

