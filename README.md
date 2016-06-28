# justine-web
Un frontend web para una API que aún no existe

## Instalación:
En este punto me parece que el usuario de esta aplicación no debería precisar de correr un bower install o algo parecido, así que aún trabajo en la forma de desplegar con todo y las librerías de terceros

Sin embargo, será necesario crear un fichero `app/configuracion.js` cuyo contenido por el momento va de la siguiente forma:
```javascript
(function (window) {
window.__env = window.env || {};
window.__env.titulo = "Empresa";
}(this))
```


