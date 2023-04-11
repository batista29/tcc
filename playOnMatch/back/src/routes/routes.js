const express = require('express')
const router = express.Router()

const usuario = require('../controllers/controllerUsuario')
const middleware = require('../middleware/middleware')

router.post('/criarUsuario', usuario.create)
router.post('/login', usuario.login)
router.get('/listarUsuarios', usuario.read)
router.get('/encontrarUsuario', usuario.readOne)
router.get('/perfilUsuario/:id', usuario.readPerfil)
router.put('/atualizarUsuario/:id', middleware.autorizacao, usuario.update)
router.delete('/excluirUsuario/:id', usuario.eliminate)

const encontro = require('../controllers/controllerEncontro')

router.post('/criarEncontro', encontro.create)
router.get('/listarEncontros', encontro.readAll)
router.get('/listarEncontro/:id', encontro.readOne)
router.delete('/apagarEncontro/:id', encontro.del)
router.put('/editarEncontro/:id', middleware.autorizacao, encontro.update)

module.exports = router