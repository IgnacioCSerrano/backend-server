// Modelo Factura

var mongoose = require('mongoose'); 

var unique = require('mongoose-unique-validator');


var FacturaSchema = new mongoose.Schema({ 
    proveedor: String,
    cif: {type: String, unique: true},
    fecha: String,
    concepto: String,
    base: Number,
    retencion: Boolean,
    tipo: Number,
    irpf: String, 
    importe: String,
    total: String
});


FacturaSchema.plugin(unique, {message: 'CIF introducido ya existe'});

module.exports = mongoose.model('Factura', FacturaSchema);
