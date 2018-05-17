// Enrutador Factura

var express = require('express');
var mongoose = require('mongoose');
var Factura = require('../models/factura')
var app = express();


// Método de petición GET (global)

app.get('/', (req, res, next)=>{
    
    Factura.find({}).exec((err, facturas)=>{ 
        
        if(err){ 
            return res.status(500).json({
                ok: false,
                mensaje: 'Error acceso Base de Datos',
                errores: err
            });
        };
       
        res.status(200).json({
            ok: true,
            facturas: facturas
        });

    });

});


// Método de petición GET (por objectId)

app.get('/:id', function(req, res, next){ 
    
    Factura.findById(req.params.id, (err, factura)=>{ 
        
        if(err){ 
            return res.status(500).json({ 
                ok: false,
                mensaje: 'Error acceso Base de Datos',
                errores: err
            });
        };

        res.status(200).json({ 
            ok: true,
            factura: factura
        });

    });

});


// Método de petición POST 

app.post('/', (req, res)=>{

    var body = req.body;

    var factura = new Factura({ 
        proveedor: body.proveedor,
        cif: body.cif,
        fecha: body.fecha,
        concepto: body.concepto,
        base: body.base,
        retencion: body.retencion,
        tipo: body.tipo,
        irpf: body.irpf,
        importe: body.importe,
        total: body.total
    });

    factura.save((err, facturaGuardada)=>{
        if (err) { 
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear factura',
                errores: err
            });
        };
        res.status(200).json({ 
            ok: true,
            factura: facturaGuardada

        });
    }); 

});


// Método de petición PUT 

app.put('/:id', function(req, res, next){ 
    
    Factura.findByIdAndUpdate(req.params.id, req.body, function(err, datos){ 
        
        if (err) return next(err); 
        
        res.json({ 
            ok: 'true',
            mensaje: 'Factura actualizada'
        });

    });

});


// Método de petición DELETE 

app.delete('/:id', function(req, res, error){
    
    Factura.findByIdAndRemove(req.params.id, function(err, datos){ 
        
        if (err) return next(err); 
        
        var mensaje = 'Factura de ' + datos.proveedor + ' eliminada';
        res.status(200).json({ 
            ok: 'true',
            mensaje: mensaje
        });

    });

});


module.exports = app;
