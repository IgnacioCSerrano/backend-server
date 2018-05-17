// Modelo Artículo

var mongoose = require('mongoose');

var unique = require('mongoose-unique-validator');


var ArticuloSchema = new mongoose.Schema({ 
    referencia: {type: String, unique: true},
    precio: Number
});


ArticuloSchema.plugin(unique, {message: 'Artículo ya existe'});

module.exports = mongoose.model('articulo', ArticuloSchema);
