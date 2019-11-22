let fechador = function (horas) {
    let tiempo = new Date();
    let delta = horas === 0 ? 0 : tiempo.getTime() + (horas * 60 * 60 * 1000);
    tiempo.setTime(delta);
    return tiempo.toUTCString();
}

let configurar = function (clave, valor) {
    let expiracion = fechador(5);
    let cadena = `${clave}=${valor}; expires=${expiracion}; path=/`;
    document.cookie = cadena;
}

let borrar = function (clave) {
    let expiracion = fechador(0);
    let cadena = `${clave}=; expires=${expiracion}; path=/`;
    document.cookie = cadena;
}

let dumper = function () {
    return document.cookie.split(';')
        .map(elemento => elemento.split("="))
        .filter(elemento => elemento.length == 2)
        .reduce(function (objecto, item) {
            objecto[item[0]] = item[1];
            return objecto;
        }, {});
}

let obtener = function(clave){
    let resultado =  document.cookie.split(';')
        .map(elemento => elemento.split('='))
        .filter(elemento => elemento.length == 2)
        .find(elemento => elemento[0].trim() === clave);
    
    return (typeof(resultado) === 'undefined') ? false : resultado[1];
}

export  {fechador, configurar, borrar, dumper, obtener};