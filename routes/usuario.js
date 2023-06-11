const { Router } = require('express');
const Usuario = require('../models/Usuario');
const {createUsuario, getUsuarios} =
 require('../controllers/usuario');
const { validationResult, check } = require('express-validator')
const bycript = require('bcryptjs');
const { validarJWT } = require('../middleware/validar-kwt');
const { validarRolAdmin } = require('../middleware/validar-rol-admin');
 
const router = Router()

// crear
//router.post('/', createUsuario)

// consultar todos
router.get('/', getUsuarios)

// validasiones
router.post('/', [
    check('nombre', 'invalid.nombre').not().isEmpty(),
    check('email', 'invalid.email').isEmail(),
    check('contrasena', 'invalid.contrasena').not().isEmpty(),
    check('rol', 'invalid.rol').isIn(['ADMIN','OBSERVADOR']),
    validarJWT, validarRolAdmin
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

            //usuario.estado = req.body.estado;
            usuario.fechaCreacion = new Date();
            usuario. fechaActualizacion = new Date();
    
            usuario = await usuario.save();
            res.send(usuario);
    
        }catch (error) {
            console.log(error);
            res.status(500).json({mensaje: 'Internal server error'});
        }
    });

    router.get('/', [ validarJWT ], async function(req, res){
        try {
            const usuarios = await Usuario.find();
            res.send(usuarios);
        } catch (error) {
            console.log(error);
            res.status(500).json({mensaje: 'ocurrió un error'});
        }
    })

module.exports = router;