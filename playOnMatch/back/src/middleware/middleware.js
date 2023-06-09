const jwt = require('jsonwebtoken')
require('dotenv').config()

const verificarAmigo = require('../controllers/controllerUsuario')
const respostaAmizade = require('../controllers/controllerListaAmigo')

const autorizacao = (req, res, next) => {
    console.log(req.params.id)

    const token = req.headers.authorization
    jwt.verify(token, process.env.KEY, (err, data) => {
        if (err != null) {
            res.status(404).json(err).end()
        } else {
            if (data.id === Number(req.params.id)) {
                next()
            } else {
                res.status(401).end()
            }
        }
    })
}

const autVerPerfil = async (req, res, next) => {
    const idLogado = req.params.idLogado;
    const idUsuario = req.params.idUsuario;
    const resultado = await verificarAmigo.verificarAmigo(idLogado, idUsuario)

    const token = req.headers.authorization
    jwt.verify(token, process.env.KEY, (err, data) => {
        if (err != null) {
            res.status(404).json(err).end()
        } else {
            if (resultado.mensagem === 'amigos' || data.id === Number(idUsuario)) {
                next()
            } else {
                res.status(403).send({ mensagem: 'Acesso não autorizado' });
            }
        }
    })
}

// const solicitacaoAmizade = async (req, res, next) => {
//     const resultado = await respostaAmizade.respostaAmizade(req)
//     console.log(resultado)

//     const token = req.headers.authorization
//     jwt.verify(token, process.env.KEY, (err, data) => {
//         if (err != null) {
//             res.status(404).json(err).end()
//         } else {
//             if (resultado == 1) {
//                 next()
//             } else {
//                 res.status(403).send({ mensagem: 'solicitação de amizade rejeitada' });
//             }
//         }
//     })
// }




module.exports = {
    autorizacao,
    autVerPerfil,
    // solicitacaoAmizade
}