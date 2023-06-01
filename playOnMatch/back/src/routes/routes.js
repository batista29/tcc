const express = require('express')
const router = express.Router()

const usuario = require('../controllers/controllerUsuario')
const middleware = require('../middleware/middleware')

router.post('/criarUsuario', usuario.create)
router.put('/atualizarFoto/:userId', usuario.atualizarFotoPerfil)
router.get('/perfil/:userId/foto', usuario.verImagem)
router.post('/login', usuario.login)
router.get('/listarUsuarios', usuario.read)
router.get('/listarUsuario/:id', usuario.listaUsuario)
router.get('/encontrarUsuario', usuario.readOne)

router.get('/perfilUsuario/:idLogado/:idUsuario', middleware.autVerPerfil, usuario.readPerfil)

router.get('/perfil/:idUsuario', usuario.readPerfil)
router.get('/lista/:idUsuario', usuario.listarAmigos)
router.put('/atualizarUsuario/:id', middleware.autorizacao, usuario.update)
router.delete('/excluirUsuario/:id', usuario.eliminate)
router.delete('/excluirAmigo/:idLogado/:idAmigo', usuario.eliminateAmigo)

const encontro = require('../controllers/controllerEncontro')

router.post('/criarEncontro/:idCriadorPartida', encontro.create)
router.post('/adicionarParticipante/:idEncontro/:idNovoParticipante', encontro.novoParticipante)
router.put('/responderConvite/:idParticipante', encontro.responderConvite)
router.get('/verConvite/:idParticipante', encontro.verConvite)
router.post('/convidarAmigo/:idEncontro/:idAmigo', encontro.convidarUsario)
router.delete('/excluirParticipante/:idEncontro/:idParticipante', encontro.deletarParticipante)
router.get('/listarEncontros', encontro.readAll)
router.get('/listarEncontro/:id', encontro.readOne)
router.delete('/apagarEncontro/:id', encontro.del)
router.put('/editarEncontro/:id/:idEncontro', middleware.autorizacao, encontro.update)
router.put('/finalizarEncontro/:id/:idEncontro', middleware.autorizacao, encontro.finalizarEncontro)

const local = require('../controllers/controllerLocal')

router.post('/criarLocal', local.create)
router.get('/listarLocais', local.readAll)
router.get('/listarLocal/:id', local.readOne)
router.delete('/apagarLocal/:id', local.del)
router.put('/editarLocal/:id', local.update)

const listaAmigo = require('../controllers/controllerListaAmigo')

router.post('/enviarSolicitacao/:idCriador/:idAmigo', listaAmigo.enviarSolicitacaoAmizade)
router.get('/verSolicitacao/:idAmigo', listaAmigo.responsderSolicitacaoAmizade)
router.put('/solicitacaoAmizade/:idCriadorLista/:idNovoAmigo', listaAmigo.updateListaAmigo)
router.delete('/cancelarSolicitacao/:idLista1/:idLista2', listaAmigo.cancelarSolicitacaoAmizade)

const favorito = require('../controllers/controllerFavoritos')

router.post('/favoritarEncontro/:idUsuario/:idEncontro', favorito.createFavoritos)
router.get('/encontros/:idUsuario', favorito.readFavorito)
router.delete('/removerEncontros/:idUsuario/:idEncontro', favorito.removerFavorito)

module.exports = router