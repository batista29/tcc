const express = require('express')
const router = express.Router()

const usuario = require('../controllers/controllerUsuario')
const middleware = require('../middleware/middleware')

router.post('/criarUsuario', usuario.create)
router.post('/login', usuario.login)
router.post('/resposta/:idEnviado/:idRecebido', middleware.solicitacaoAmizade)
router.post('/solicitacaoAmizade/:idEnviado/:idRecebido', middleware.solicitacaoAmizade, usuario.updateListaAmigo)
// router.post('/createLista', usuario.createListaAmigo)
// router.post('/solicitacaoAmizade', usuario.createListaAmigo)
router.get('/listarUsuarios', usuario.read)
router.get('/encontrarUsuario', usuario.readOne)
router.get('/perfilUsuario/:idLogado/:idUsuario', middleware.autVerPerfil,usuario.readPerfil)
router.get('/lista/:id', usuario.readListaAmigo)
// router.post('/enviarSolicitacao', usuario.enviarSolicitacao)
// router.get('/lista/:id', usuario.readListaAmigo)
router.put('/atualizarUsuario/:id', middleware.autorizacao, usuario.update)
router.put('/atualizarLista/:idEnviado/:idRecebido', usuario.updateListaAmigo)
router.delete('/excluirUsuario/:id', usuario.eliminate)

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