// Modelo Presupuesto

var mongoose = require('mongoose');


var autoIncrement = require('mongoose-auto-increment');

var conection = mongoose.createConnection('mongodb://localhost:27017/erp'); 
// var conection = mongoose.createConnection('mongodb://localhost:27101,localhost:27102,localhost:27103/erp?replicaSet=clusterserv'); 

autoIncrement.initialize(conection);

var PresupuestoSchema = new mongoose.Schema({ 
    cliente: String,
    cif: String,
    fecha: String,
    items: Array,
    suma: Number,
    total: String
});

PresupuestoSchema.plugin(autoIncrement.plugin, {model: 'Presupuesto', field: 'numero', startAt: 1})

module.exports = mongoose.model('Presupuesto', PresupuestoSchema);
