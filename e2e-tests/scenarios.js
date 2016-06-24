'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function() {


  it('should automatically redirect to /inicio when location hash/fragment is empty', function() {
    browser.get('index.html');
    expect(browser.getLocationAbsUrl()).toMatch("/inicio");
  });


  describe('inicio', function() {

    beforeEach(function() {
      browser.get('index.html#!/inicio');
    });


    it('Debería renderizar vista inicio', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/Panel 1 Esto es más contenido presente/);
    });

  });


  describe('usuario/actualizacion', function() {

    beforeEach(function() {
      browser.get('index.html#!/usuario/actualizacion');
    });


    it('Debería renderizar la vista de usuario/actualizacion', function() {
      expect(element.all(by.css('[ng-view] h3')).first().getText()).
        toMatch(/Este es nuestro hermoso formulario de actualización de datos/);
    });
  });
});
