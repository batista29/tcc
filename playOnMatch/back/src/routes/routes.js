const express = require('express')
const router = express.Router()

const usuario = require('../controllers/controllerUsuario')
const middleware = require('../middleware/middleware')

router.post('/criarUsuario', usuario.create)
router.post('/login', usuario.login)
router.post('/solicitacaoAmizade/:idCriadorLista/:idNovoAmigo',middleware.solicitacaoAmizade,usuario.updateListaAmigo)
router.get('/listarUsuarios', usuario.read)
router.get('/encontrarUsuario', usuario.readOne)
router.get('/perfilUsuario/:idLogado/:idUsuario', middleware.autVerPerfil,usuario.readPerfil)
router.get('/lista/:idUsuario',usuario.listarAmigos)
router.put('/atualizarUsuario/:id', middleware.autorizacao, usuario.update)
router.delete('/excluirUsuario/:id', usuario.eliminate)
router.delete('/excluirAmigo/:idLogado/:idAmigo', usuario.eliminateAmigo)

const encontro = require('../controllers/controllerEncontro')

router.post('/criarEncontro', encontro.create)
router.get('/listarEncontros', encontro.readAll)
router.get('/listarEncontro/:id', encontro.readOne)
router.delete('/apagarEncontro/:id', encontro.del)
router.put('/editarEncontro/:id/:idUsuario', middleware.autorizacao, encontro.update)

const local = require('../controllers/controllerLocal')

router.post('/criarLocal', local.create)
router.get('/listarLocais', local.readAll)
router.get('/listarLocal/:id', local.readOne)
router.delete('/apagarLocal/:id', local.del)
router.put('/editarLocal/:id', local.update)


module.exports = router