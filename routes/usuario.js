// Enrutador Usuario 

var express = require('express');
var bcryptjs = require('bcryptjs');
var Usuario = require('../models/usuario.js');
var app = express();


// Método de petición GET (global)

app.get('/', (req, res, next)=>{
    
    Usuario.find({}).exec((err, usuarios)=>{

        if(err){
            return res.status(500).json({
                ok: false,
                mensaje: 'Error acceso Base de Datos',
                errores: err
            });
        };
        
        res.status(200).json({
            ok: true,
            usuarios: usuarios 
        });
    });

});


// Método de petición GET (por objectId)

app.get('/:id', function(req, res, next){
    
    Usuario.findById(req.params.id, (err, usuario)=>{ 
        if(err){ 
            return res.status(500).json({ 
                ok: false,
                mensaje: 'Error acceso Base de Datos',
                errores: err
            });
        }

        res.status(200).json({ 
            ok: true,
            usuario: usuario
        });

    });
    
});


// Método de petición POST

app.post('/', function(req, res, next){
    var body = req.body; 

    var usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcryptjs.hashSync(body.password, 10),
        rol: body.rol
    });

    usuario.save((err, datos)=>{ 
        
        if(err) { 
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear usuario',
                errores: err
            });
        };

        res.status(200).json({
            ok: true,
            mensaje: 'Usuario creado correctamente'
        });

    });

});


// Método de petición PUT

app.put('/:id', (req, res, next)=>{ 

    var body = req.body; 

    Usuario.findById(req.params.id, (err, usuario)=>{ 
        
        if(err){
            return res.status(500).json({
                ok: false,
                mensaje: 'Error de conexión con servidor'
            });
        };

        usuario.nombre = body.nombre;
        usuario.email = body.email;
        usuario.rol = body.rol;

        usuario.save((err, usuarioModificado)=>{ 
            
            if(err){
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al modificar usuario',
                    errores: err
                });
            };
            res.status(200).json({
                ok: true,
                mensaje: 'Usuario actualizado correctamente'
            });

        });

    });

});


// Método de petición DELETE

app.delete('/:id', function(req, res, error){

    Usuario.findByIdAndRemove(req.params.id, function(err, datos){

        if (err) return next(err);
        
        var mensaje = 'Usuario ' + datos.nombre + ' eliminado';
        res.status(200).json({ 
            ok: 'true',
            mensaje: mensaje
        });

    });

});


module.exports = app;
