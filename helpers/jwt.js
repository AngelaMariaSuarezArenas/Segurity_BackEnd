const jwt = require('jsonwebtoken');
//const Usuario = require('../models/Usuario');

const generarJWT = (usuario)=> {
    const payload = { _id: usuario._id, nombre: usuario.nombre, 
        email: usuario.email, contrasena: usuario.contrasena, rol: usuario.rol };
    const token = jwt.sign(payload, '123456'); //{ expiresIn: '1h'}); //2023-06-06 19:50  // 2023-06-06 20:50
    return token;
}

module.exports = {
    generarJWT
}