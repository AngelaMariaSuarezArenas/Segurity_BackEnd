const Inventario = require('../models/Inventario')
const { request, response} = require('express')
const Usuario = require('../models/Usuario')
const Marca = require('../models/Marca')
const EstadoEquipo = require('../models/EstadoEquipo')
const TipoEquipo = require('../models/TipoEquipo')

// crear
const createInventario = async (req = request, 
    res = response) => {
        try{
          const data = req.body
          console.log(data)
          const { usuario, marca, estadoEquipo, tipoEquipo } = data;

          //Validar usuario
          const usuarioDB = Usuario.findOne({
            _id: usuario._id,
            estado: true
          })//select* from usuarios where _id=? and estado=true
          if(!usuarioDB){
            return res.status(400).json({msg: 'usuario invalido'})
          }
          //validar marca
          const marcaDB = Marca.findOne({
            _id: marca._id,
            estado: true
          })//select* from marcas _id=? and estado =true
          if(!marcaDB){
            return res.status(400).json({msg: 'marca inválida'})
          }
          //Validar estadoEquipo
          const estadoEquipoDB = EstadoEquipo.findOne({
            _id: estadoEquipo._id,
            estado: true
          })// select * from estados where _id=? and estado = true
          if(!estadoEquipoDB){
            return res.status(400).json({msg: 'estado inválido'})
          }
          // validar tipo equipo
          const tipoEquipoDB = TipoEquipo.findOne({
            _id: tipoEquipo._id,
            estado: true
          })// select * from tipoEquipo where _id=? and estado= true
          if(!tipoEquipoDB){
          return res.status(400).json({msg: 'estado inválido'})
        }
            const inventario = new Inventario(data)

            await inventario.save()

            return res.status(201).json(inventario)
    }catch(e){
        return res.status(500).json({
            msg: 'Error general' + e
        })
      }
    }

//listar todos
const getInventario = async (req = request, 
    res = response) => {
        try{
          const { estado } = req.query
            const inventarioDB = await Inventario.find({estado})//select * from inventario where estado=?
               .populate({
                path: 'usuario',
                match: { estado: true}
               })
               .populate({
                path: 'Marca',
                match: { estado: true}
               })
               .populate({
                path: 'Estado',
                match: { estado: true}
               })
               .populate({
                path: 'TipoEquipo',
                match: { estado: true}
               })
            return res.json(inventarioDB)
        }catch(e){
            return res.status(500).json({
                msg: 'Error general ' + e
            })
        }
}

// actualizar inventario
const updateInventarioByID = async (req = request,
  res = response) => {

    try{
      const { id } = req.params
      const data = req.body
      const inventario = await Inventario.findByIdAndUpdate(id, data, {new: true})
      return res.status(201).json({msj: 'inventario'})
    }catch(e){
      console.log(e)
      return res.status(500).json({msj: 'Error'})
    }
  }

module.exports = {createInventario, getInventario, updateInventarioByID}