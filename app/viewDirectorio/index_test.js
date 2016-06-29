'use strict';

describe('myApp.inicio module', function() {

  beforeEach(module('myApp.inicio'));

  describe('inicio controller', function(){
    var scope = {}; 

    it('should ....', inject(function($rootScope, $controller) {
      //spec body
      scope = $rootScope.$new();
      var directorioCtrl = $controller('directorioCtrl', {$scope: scope});

      expect(directorioCtrl).toBeDefined();
    }));

  });
});
