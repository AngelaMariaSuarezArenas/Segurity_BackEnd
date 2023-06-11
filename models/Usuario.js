const {Schema, model} = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        require: [true, 'Nombre requerido']
    },
    email: {
         type:  String,
         required: [true, 'Email requerido'],
         unique: true
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
contrasena: {
        type: String,
        required: true
    },
    rol: {
        type: String,
        required: true,
        enum: ['ADMIN', 'OBSERVADOR']
    },
    fechaCreacion: {
        type: Date,
        default: new Date()
    },
    fechaActualizacion: {
        type: Date,
        default: new Date()
    },
})    


module.exports = model('Usuario', UsuarioSchema);
