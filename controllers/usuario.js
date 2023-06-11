const { Router } = require('express');
const Usuario = require('../models/Usuario')
const { request, response} = require('express')
//const { validationResult, check } = require('express-validator')
//const bycript = require('bcryptjs');
//const { router, router } = require('../app');

const router = Router()

// crear
const createUsuario = async (req = request,
    res = response) => {
        try{
            const data = req.body
            const email = data.email
            console.log(data)
            const usuarioDB = await Usuario.findOne({ email })
            if(usuarioDB){
                return res.status(400).json({msg: 'Ya existe usuario'})
            }
            const usuario = new Usuario(data)
            console.log(usuario)
            await usuario.save()
            return res.status(201).json(usuario)
        }catch(e){
            console.log(e)
            return res.status(500).json({e})
        }
    }    

    // validasiones
/*router.post ('/', [
    check('nombre', 'invalid.nombre').not().isEmpty(),
    check('email', 'invalid.email').isEmail(),
    check('contrasena', 'invalid.contrasena').not().isEmpty(),
    check('rol', 'invalid.rol').isIn(['ADMIN','OBSERVADOR']),
 ], async function(req, res){
    
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()){
                return res.status(400).json({mensaje: errors.array()});
            }
    
            const existeUsuario = await Usuario.findOne({email: req.body.email});
            if (existeUsuario) {
                return res.status(400).send('Email ya existe');
            }
    
            let usuario = new Usuario();
            usuario.nombre = req.body.nombre;
            usuario.email = req.body.email;
            usuario.rol = req.body.rol;

            const salt = bycript.genSaltSync();
            const contrasena = bycript.hashSync(req.body.contrasena, salt);
            usuario.contrasena = contrasena;

            usuario.estado = req.body.estado;
            usuario.fechaCreacion = new Date();
            usuario. fechaActualizacion = new Date();
    
            usuario = await usuario.save();
            res.send(usuario);
    
        }catch (error) {
            console.log(error);
            res.status(500).json({mensaje: 'Internal server error'});
        }
    });

    router.get('/', async function(req, res){
        try {
            const usuarios = await Usuario.find();
            res.send(usuarios);
        } catch (error) {
            console.log(error);
            res.status(500).json({mensaje: 'ocurrió un error'});
        }
    })*/

//listar usuario
const getUsuarios = async (req = request, 
    res = response) => {
        try{
            const { estado } = req.query
            const usuarioDB = await Usuario.find({estado})//select * from usuario where estado=?
            return res.json(usuarioDB)
        }catch(e){
            return res.status(500).json({
                msg: 'Error general ' + e
            })
        }

}
module.exports = {createUsuario, getUsuarios};
