const express = require('express')

const cors = require('cors')

const app = express()

const router = require('./src/routes/routes')

app.use(express.json())
app.use(cors())
app.use(router)

app.listen(3000, () => {
    console.log("app rodando")
})