// Modelo Usuario

var mongoose = require('mongoose');

var unique = require('mongoose-unique-validator');


var UsuarioSchema = new mongoose.Schema({
    nombre: String,
    email: { type: String, unique: true },
    password: String,
    rol: String
});

UsuarioSchema.plugin(unique, {message: 'Email introducido ya se encuentra en uso'});

module.exports = mongoose.model('Usuario', UsuarioSchema);
