'use strict';

angular.module('componentes.estados', []).
filter('jtEstadosZimbra', function(__ENV) {
    return function (estado, modelo){
        var controles = __ENV.jtSwitch[modelo];
        var salida = estado ? controles.on : controles.off;

        return salida;
    };
});
