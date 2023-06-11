const EstadoEquipo = require('../models/EstadoEquipo')
const { request, response} = require('express')

// crear
const createEstadoEquipo = async (req = request, 
    res = response) => {
    try{
        const nombre = req.body.nombre 
            ? req.body.nombre.toUpperCase()
            : ''
        const estadoEquipoDB = await EstadoEquipo.findOne({nombre})//select * from estadoEquipo where nombre=?
        
        if(estadoEquipoDB){
            return res.status(400).json({msg: 'Ya existe'})
        }
        const data = {
            nombre  // nombre: nombre
        }
        const estadoEquipo = new EstadoEquipo(data)
        console.log(estadoEquipo)
        await estadoEquipo.save()
        return res.status(201).json(estadoEquipo)
    }catch(e){
        return res.status(500).json({
            msg: 'Error general ' + e
        })
    }
}

//listar todos
const getEstadoEquipos = async (req = request, 
    res = response) => {
        try{
            const { estado } = req.query
            const estadoEquipoDB = await EstadoEquipo.find({estado})//select * from tipoEquipo where estado=?
            return res.json(estadoEquipoDB)
        }catch(e){
            return res.status(500).json({
                msg: 'Error general ' + e
            })
        }
}


module.exports = {createEstadoEquipo, getEstadoEquipos}