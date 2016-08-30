'use strict';

angular.module('justineApp.usuarios.creacion', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) { 
    $routeProvider.when('/usuarios/creacion/', {
        templateUrl: 'viewUsuarios/creacion/index.html',
        controller: 'UsuariosCreacionController',
        controllerAs: '$ctrl'
    });
}])
.controller('UsuariosCreacionController', ['$http', '__ENV', function($http, __ENV) {
    var ctrl = this;
   
    /* Configuro al elemento jt-alerta. TODO: Sigo sin resolver si esta vez no mostraremos más de uno */
    /* TODO: Sigo sin resolver en que momento evito la repetición del código de este método */
    ctrl.alerta = {};

    /* Enviamos el formulario los datos que algunos componente requieren para mostrar datos */ 
    ctrl.listadogrupos = [];
    
    /* En este punto, obtener acá el listado de grupos implica que si venimos de crear uno, la lista lo va a incluir. */
    $http({method: 'GET', url: __ENV['api']['grupos']['listado']}).
       then(function(respuesta){
            ctrl.listadogrupos = respuesta.data;
        }, function(respuesta){
            ctrl.alerta.titulo = 'El servidor devuelve un mensaje de error:'
            ctrl.alerta.codigo = respuesta.status
            ctrl.alerta.tipo = 'error'
        });

    /*Este es un objeto falso con tal que no joda */
    ctrl.usuario = {};

    /* Datos de la cuenta por defecto */
    ctrl.usuarioDetalle = {
        'grupo': 513,
        'volumenBuzon': 300,
        'sambaAcctFlags': false,
        'buzonStatus': false,
        'loginShell': 'false',
        'cuentaStatus': false,
        'jvs':{
            'estado': false,
            'valor': null
        },
    };
    
    /* Esto se corresponde con la funcionalidad de los componentes */

    /* La funcionalidad asociada con submit del formulario */
    ctrl.creacion = function(usuario, usuarioDetalle){
        var objetoCambio = angular.merge({}, usuario, usuarioDetalle);
        console.log(objetoCambio);
        
        $http.post(__ENV['api']['usuarios']['creacion'], {'corpus': objetoCambio}).
            then(function(respuesta){ 
                /* Creamos al usuario correctamente. Podemos mostrar una alerta saludable */
                ctrl.mensajes = respuesta.data;
                console.log(respuesta.data);
                ctrl.alerta.codigo = respuesta.status; 
                ctrl.alerta.tipo = 'aviso';
                ctrl.alerta.titulo = "Creación de usuario satisfactoria";
                ctrl.alerta.mensaje = "Usuario tal y tal creado";
            }, function(respuesta){
                ctrl.alerta.codigo = respuesta.status; 
                ctrl.alerta.tipo = 'error';
                ctrl.alerta.titulo = "El servidor devuelve un mensaje de error";
                ctrl.alerta.mensaje = null;
            });
    }
}]);
