// Modelo Proveedor

var mongoose = require('mongoose');

var unique = require('mongoose-unique-validator');


var ProveedorSchema = new mongoose.Schema({
    nombre: String,
    cif: {type: String, unique: true},
    direccion: String,
    cp: Number,
    localidad: String,
    provincia: String,
    telefono: String,
    email: String,
    contacto: String
});


ProveedorSchema.plugin(unique, {message: 'CIF introducido ya existe'});

module.exports = mongoose.model('Proveedore', ProveedorSchema);
