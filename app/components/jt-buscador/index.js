'use strict';

var nombres = ['givenName', 'sn', 'uid'];

/* Aún corriendole sin nada, resulta que se ejecuta siete veces antes que el contenido salga a la luz*/
angular.module('componentes.buscador', []).
filter('jtBuscador', function(){
    
    return function(contenido, filtro){
        var resultados = [];
        if (angular.isUndefined(filtro)){
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
});
