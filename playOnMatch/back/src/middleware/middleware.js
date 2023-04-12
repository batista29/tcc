const jwt = require('jsonwebtoken')
require('dotenv').config()

const autorizacao = (req, res, next) => {
    const token = req.headers.authorization
    jwt.verify(token, process.env.KEY, (err, data) => {
        if (err != null) {
            res.status(404).json(err).end()
        }else{
            if(data.id === Number(req.params.id)){
                next()
            }else{
                res.status(401).end()
            }
        }
    })
}

// const autVerPerfil = (req, res, next) => {
//     const token = req.headers.authorization
//     jwt.verify(token, process.env.KEY, (err, data) => {
//         if (err != null) {
//             res.status(404).json(err).end()
//         }else{
//             console.log(data)
//         }
//     })
// }

module.exports = {
    autorizacao
}