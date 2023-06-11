const {Router} = require('express');
const Usuario = require('../models/Usuario');
const { validationResult, check } = require('express-validator');
const bycript = require('bcryptjs');
const {generarJWT} = require('../helpers/jwt');

const router = Router()

router.post('/', [
     check('email', 'invalid.email').isEmail(),
     check('contrasena', 'invalid.contrasena').not().isEmpty(),
], async function(req, res){

    try {
        const errors = validationResult(req);
            if (!errors.isEmpty()){
                return res.status(400).json({mensaje: errors.array()});
            }
        const usuario = await Usuario.findOne({email: req.body.email});
            console.log(req.body)
        if (!usuario) {
                return res.status(400).send({ mensaje: 'User not found'});
            }
console.log(usuario.contrasena);
            const esIgual = bycript.compareSync(req.body.contrasena, usuario.contrasena);
           // const esIgual = req.body.contrasena === usuario.contrasena
            if (!esIgual) {
                return res.status(500).send({ mensaje: 'not found'});
            }

            //generar token
            const tocken = generarJWT(usuario);
            
            return res.json({ _id: usuario._id, nombre: usuario.nombre,
            rol: usuario.rol, email: usuario.email, access_token: tocken });
            

    } catch (error) {
        console.log(error);
        res.status(500).json({mensaje: 'Internal server error'});
    }
});

module.exports = router;