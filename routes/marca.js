const { Router } = require('express')
const {createMarca, getMarca} =
 require('../controllers/marca')

const router = Router()

// crear
router.post('/', createMarca)

// consultar todos
router.get('/', getMarca)

module.exports = router;