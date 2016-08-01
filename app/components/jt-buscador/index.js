'use strict';

var nombres = ['givenName', 'sn', 'uid'];

var buscadorRemoto = function(busqueda){
    console.log("Como ya casi no hay componentes, supongo que tengo que ir a buscarlos yo mismo al backend"); 
    console.log(busqueda);
    return     [{
        "ou": "Unidad De Salud Ambiental", 
        "givenName": "Ana del Carmen", 
        "sn": "Hern\u00e1ndez Ramos", 
        "o": {
            "nombre": "Secretar\u00eda de Estado SS Ministerio de Salud", 
            "id": 1038
        }, 
        "uid": "dlhernandez"
    }];

    /*
    $http({url:'/api/usuario_listado_beta.json', method: 'GET'}).then(
        function(respuesta){
            console.log(respuesta.data.data);
            return respuesta.data.data;
        }, function(respuesta){
            console.log('Algo malo sucedió con el servidor');
        });
    */
};

/* Aún corriendole sin nada, resulta que se ejecuta siete veces antes que el contenido salga a la luz*/
angular.module('componentes.buscador', []).
filter('jtBuscador', function(){
    
    return function(contenido, filtro){
        var resultados = [];
        if (angular.isUndefined(filtro)){
            console.log('No hay filtro, no hay trabajo');
            resultados = contenido;    
        } else {
            var busqueda = filtro.toLowerCase();
            angular.forEach(contenido, function(item){
                var cadena = "";
                /* Por ahora, la idea es especificar con los atributos del item especificados en la lista nombres */
                angular.forEach(nombres, function(atributo){
                   cadena += " " + item[atributo];
                });
                /* Luego, convierto dicha cadena a minúsculas sin tildes, el gran obstaculo en nuestro caso */
                cadena = cadena.toLowerCase().replace('á','a').replace('é','e').replace('í','i').replace('ó','o').replace('ú','u');
                /* Porque estamos suponiendo que indexOf es más rapido que un test, por ahora tengo que confesar que es una suposición
                   basada en un par de respuesta de stackOverFlow
                */
                if (cadena.indexOf(busqueda)>=0){
                    resultados.push(item);
                };
            });
        };
        return resultados;
    };
}).
filter('jtDevolvedor', function(){
   return function(contenido){
        var resultado = [];
        var contenidoRemoto = [];
        /*
        if ((resultados.length) <= 30 && (busqueda.length % 3) === 0){
            var contenidoRemoto = buscadorRemoto(busqueda);
            console.log(contenidoRemoto);
            resultados = resultados.concat(contenidoRemoto);
        };
        */
        if (contenido.length < 20){
            contenidoRemoto = [{
                "ou": "Unidad De Salud Ambiental", 
                "givenName": "Ana del Carmen", 
                "sn": "Hern\u00e1ndez Ramos", 
                "o": {
                    "nombre": "Secretar\u00eda de Estado SS Ministerio de Salud", 
                    "id": 1038
                }, 
                "uid": "dlhernandez"
        }]
        }
        resultado = contenido.concat(contenidoRemoto);
        return resultado;
    } 
});
