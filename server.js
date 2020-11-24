const express = require('express')
const server = express()
const port = 4000

server.get('/', (req, resp) => resp.send('Hi'))

server.listen(port, () => console.log(`Server running at ${port}`))

