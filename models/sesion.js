// Modelo Sesión

var mongoose = require('mongoose');


var SesionSchema = new mongoose.Schema({
    nombre: String,
    userId: String,
    login: Date, 
    logout: Date,
    duracion: String
});

module.exports = mongoose.model('Sesione', SesionSchema);
