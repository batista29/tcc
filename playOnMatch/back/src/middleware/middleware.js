const jwt = require('jsonwebtoken')
require('dotenv').config()

const verificarAmigo = require('../controllers/controllerUsuario')
const respostaAmizade = require('../controllers/controllerUsuario')

const autorizacao = (req, res, next) => {
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
            if (resultado.menssagem === 'amigos' || data.id === Number(idUsuario)) {
                next()
            } else {
                res.status(403).send({ mensagem: 'Acesso não autorizado' });
            }
        }
    })
}

const solicitacaoAmizade = async (req, res, next) => {
    const idEnviado = req.params.idEnviado;
    const idUsuario = req.params.idRecebido;
    const resultado = await respostaAmizade.respostaAmizade(idEnviado, idUsuario)

    const token = req.headers.authorization
    jwt.verify(token, process.env.KEY, (err, data) => {
        if (err != null) {
            res.status(404).json(err).end()
        } else {
            
        }
    })
}




module.exports = {
    autorizacao,
    autVerPerfil,
    solicitacaoAmizade
}