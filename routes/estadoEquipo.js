const { Router } = require('express')
const {createEstadoEquipo, getEstadoEquipos} =
 require('../controllers/estadoEquipo')

const router = Router()

// crear
router.post('/', createEstadoEquipo)

// consultar todos
router.get('/', getEstadoEquipos)

module.exports = router;