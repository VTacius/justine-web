function Autenticacion (){
    this.storage = window.localStorage;
}

Autenticacion.prototype.isLogin = function(){
    let data  = document.cookie;
    
    let partes = data.split(';');
    let resultado = partes.find(function(item){
        let datos = item.split('=');
        if (datos.length === 2){
            return datos[0].trim() === 'logueado';
        }
    });
    if (resultado){
        console.log('Estoy logueado');
    }
    return resultado;
 
};

export default Autenticacion;