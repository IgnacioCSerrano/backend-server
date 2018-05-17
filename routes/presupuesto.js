// Enrutador Presupuesto

var express = require('express');
var mongoose = require('mongoose');
var Presupuesto = require('../models/presupuesto.js');
var app = express();


// Método de petición GET (global)

app.get('/', (req, res, next)=>{
    
    Presupuesto.find({}).sort({numero:1}).exec((err, presupuestos)=>{ 
        if(err){ 
            return res.status(500).json({
                ok: false,
                mensaje: 'Error acceso Base de Datos',
                errores: err
            });
        };
        
        res.status(200).json({
            ok: true,
            presupuestos: presupuestos
        });

    });

});


// Método de petición GET (agregación presupuestos totales por cliente)

app.get('/totales-cliente', (req, res, next)=>{
    
    Presupuesto.aggregate([{$group:{_id:{cliente:"$cliente"},total:{$sum:"$suma"}}}]).exec((err, datos)=>{ 
        if(err){ 
            return res.status(500).json({
                ok: false,
                mensaje: 'Error acceso Base de Datos',
                errores: err
            });
        };
        
        res.status(200).json({
            ok: true,
            datos: datos
        });

    });

});


// Método de petición GET (por objectId)

app.get('/:id', function(req, res, next){ 
    
    Presupuesto.findById(req.params.id, (err, presupuesto)=>{ 
        
        if(err){ 
            return res.status(500).json({ 
                ok: false,
                mensaje: 'Error acceso Base de Datos',
                errores: err
            });
        };
        
        res.status(200).json({ 
            ok: true,
            presupuesto: presupuesto
        });

    });

});


// Método de petición POST 

app.post('/', (req, res)=>{

    var body = req.body;

    var presupuesto = new Presupuesto({ 
        cliente: body.cliente,
        cif: body.cif,
        fecha: body.fecha,
        items: body.items,
        suma: body.suma,
        total: body.total
    });

    presupuesto.save((err, presupuestoGuardado)=>{
        if (err) { 
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear presupuesto',
                errores: err
            });
        };
        res.status(200).json({ 
            ok: true,
            presupuesto: presupuestoGuardado
        });
    }); 

});


// Método de petición PUT 

app.put('/:id', function(req, res, next){ 
    
    Presupuesto.findByIdAndUpdate(req.params.id, req.body, function(err, datos){ 
        
        if (err) return next(err); 
        res.json({ 
            ok: 'true',
            mensaje: 'Presupuesto actualizado'
        });
    });
});


// Método de petición DELETE 

app.delete('/:id', function(req, res, error){
    
    Presupuesto.findByIdAndRemove(req.params.id, function(err, datos){ 
        
        if (err) return next(err); 
        
        var mensaje = 'Presupuesto de ' + datos.cliente + ' eliminado'
        res.status(200).json({ 
            ok: 'true',
            mensaje: mensaje
        });

    });

});


module.exports = app;
