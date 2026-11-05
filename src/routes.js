const express = require("express")
const router = express.Router()

const usuario = require('./controllers/usuario')
const usoia = require('./controllers/usoia')

const rotaInicial = (req, res) => {
    res.json("Back-end respondendo")
}

router.get('/',rotaInicial)
router.get('/usuario', usuario.listar)
router.post('/usuario', usuario.cadastrar)
router.put('/usuario/:id', usuario.alterar)
router.delete('/usuario/:id', usuario.excluir)
router.post('/usuario/login', usuario.login)

router.get('/usoia', usoia.listar)
router.post('/usoia', usoia.cadastrar)
router.put('/usoia/:id', usoia.alterar)
router.delete('/usoia/:id', usoia.excluir)
router.get('/usoia/resumo', usoia.resumo)

module.exports = router