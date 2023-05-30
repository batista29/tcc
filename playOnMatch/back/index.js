const express = require('express')
const cors = require('cors')

const router = require('./src/routes/routes')

const server = express()

server.use(express.json())
server.use(cors())
server.use(router)

server.listen(3000, () => {
    console.log("api rodando")
})