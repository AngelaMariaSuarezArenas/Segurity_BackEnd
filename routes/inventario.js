const { Router } = require('express')
const {createInventario, getInventario} =
 require('../controllers/inventario')

const router = Router()

// crear
router.post('/', createInventario)

// consultar todos
router.get('/', getInventario)

module.exports = router;