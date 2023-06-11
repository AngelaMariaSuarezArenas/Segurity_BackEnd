const express = require('express')
const app = express()
const cors = require('cors')


// middlewares
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors({
       origin: '*'
}))
      

const tipoEquipo = require('./routes/tipoEquipo')
const estadoEquipo = require('./routes/estadoEquipo')
const usuario = require('./routes/usuario')
const auth = require('./routes/auth')
const marca = require('./routes/marca')
const inventario = require('./routes/inventario')

// middlewares
app.use('/api/tipoEquipos', tipoEquipo)
app.use('/api/estadosEquipos', estadoEquipo)
app.use('/api/usuarios', usuario)
app.use('/api/auth', auth)
app.use('/api/marcas', marca)
app.use('/api/inventarios', inventario)
 
module.exports = app