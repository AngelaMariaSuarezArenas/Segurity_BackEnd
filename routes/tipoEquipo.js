const { Router } = require('express')
const {createTipoEquipo, getTipoEquipos} =
 require('../controllers/tipoEquipo')

const router = Router()

// crear
router.post('/', createTipoEquipo)

// consultar todos
router.get('/', getTipoEquipos)

module.exports = router;

