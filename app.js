// Servidor Backend

var express = require('express');
var bodyParser = require('body-parser');

var proveedor = require('./routes/proveedor.js');
var factura = require('./routes/factura.js');
var cliente = require('./routes/cliente.js');
var presupuesto = require('./routes/presupuesto.js');
var usuario = require('./routes/usuario.js');
var login = require('./routes/login.js');
var sesion = require('./routes/sesion.js');
var articulo = require('./routes/articulo.js');

var app = express();

var mongoose = require('mongoose');

mongoose.Promise = require('bluebird');


mongoose.connect('mongodb://localhost:27017/erp', {promiseLibrary: require('bluebird')}) 
// mongoose.connect('mongodb://localhost:27101,localhost:27102,localhost:27103/erp?replicaSet=clusterserv', {promiseLibrary: require('bluebird')})    
    .then(()=>{
        console.log('Conectado a Base de Datos');
    })
    .catch((err)=>{
        console.error(err);
    });


app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods","GET, POST, PUT, DELETE, OPTIONS");
    next();
});


app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({'extended':false}));


app.use('/proveedor', proveedor);
app.use('/factura', factura);
app.use('/cliente', cliente);
app.use('/presupuesto', presupuesto);
app.use('/usuario', usuario);
app.use('/login', login);
app.use('/sesion', sesion);
app.use('/articulo', articulo);


app.listen(3000, function(){
    console.log('Servidor escuchando en puerto 3000');
});
