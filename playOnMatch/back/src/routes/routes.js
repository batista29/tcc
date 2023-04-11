const express = require('express')
const router = express.Router()

const usuario = require('../controllers/controllerUsuario')

router.post('/criarUsuario', usuario.create)
router.post('/login', usuario.login)
router.get('/listarUsuarios', usuario.read)
router.get('/encontrarUsuario', usuario.readOne)
router.put('/atualizarUsuario/:id', usuario.update)
router.delete('/excluirUsuario/:id', usuario.eliminate)

const encontro = require('../controllers/controllerEncontro')

router.post('/criarEncontro', encontro.create)
router.get('/listarEncontros', encontro.readAll)
router.get('/listarEncontro/:id', encontro.readOne)
router.delete('/apagarEncontro/:id', encontro.del)
router.put('/editarEncontro/:id', encontro.update)

module.exports = router