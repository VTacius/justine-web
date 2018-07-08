'use strict';

angular.module('componentes.filtros', []).
filter('grupeante', function() {
    return function (listadoGrupos, gid){
        gid = gid || '';
        var salida = '';
        
        /* Necesito para este truco un gidNumber cadena de text, itero sobre la lista para encontrar coincidencias*/ 
        for (var i = 0; i < listadoGrupos.length; i++){
            if (listadoGrupos[i]['gidNumber'] == gid){
                salida = listadoGrupos[i]['cn']
                return salida
            }
        };        

        return salida;
    };
});
