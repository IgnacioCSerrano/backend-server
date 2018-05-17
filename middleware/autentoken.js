// Este archivo añade identificación adicional al iniciar sesión, valiéndose para ello del token creado en enrutador 'login.js' (comprueba que token con el que se ha iniciado sesión es correcto), de manera que no sea posible manipular datos de servidor backend a través de su URL con aplicaciones tipo Postman ('Token incorrecto', 'jwt must be provided')

    // IMPORTANTE: cuando 'token' de sesión caduca (transcurrido el tiempo en segundos especificado en '{expiresIn: 3600}' de enrutador 'login.js'), se produce un error en desencriptación de usuario ('Token incorrecto')

var jsonwebtoken = require('jsonwebtoken');

exports.verificarToken = function(req, res, next){

    var token = req.query.token; // variable 'token' recoge parámetro ('token') de consulta ('query') de petición (establecida como '?token=' en cada método de petición HTTP que se quiera proteger, en este ejemplo, en proveedores.service.ts' de servidor frontend en ruta 'url' construida con método 'deleteProveedor(id)' para proteger la eliminación de registros de proveedores)

    jsonwebtoken.verify(token, 'awtvlhicbyea', (err, decoded)=>{ // 'awtvlhicbyea' es misma clave secreta para crear 'token' establecida en enrutador 'login.js'; parámetro de función flecha 'decoded' desencripta usuario creado dentro de 'token' ('login.js')
        if(err){ // si hay error (usuario no se ha desencriptado correctamente porque 'token' no contiene clave secreta especificada, cuando se intenta acceder a servidor backend desde aplicación externa)
            return res.status(400).json({
                ok: false,
                mensaje: 'Token incorrecto',
                errores: err
            });
        }

        req.usuario = decoded.usuario; // verifica que 'usuario' de petición coincide con 'usuario' que viene desencriptado de 'token'
        next();

    });

}

    /* 
        IMPORTANTE: para aplicar autenticación de token a método de petición HTTP deseado, hay que:

        - Incluir (situado entre '/' y función flecha de 'req' y 'res') 'autenToken.verificarToken' (siendo 'autenToken' variable que recoge 'middleware/autentoken.js') en método de enrutador que gestiona dicha petición ('app.delete()' de 'proveedor.js')

        - Modificar 'url' en servicio de servidor frontend que conecta con dicho enrutador en servidor backend ('proveedores.service.ts') para acomodar 'token' recibido
    */