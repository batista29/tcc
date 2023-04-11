const express = require('express')
const router = express.Router()

const usuario = require('../controllers/controllerUsuario')

router.post('/criarUsuario', usuario.create)
router.post('/login', usuario.login)
router.get('/listarUsuarios', usuario.read)
router.get('/encontrarUsuario', usuario.readOne)
router.put('/atualizarUsuario/:id', usuario.update)
router.delete('/excluirUsuario/:id', usuario.eliminate)

module.exports = router