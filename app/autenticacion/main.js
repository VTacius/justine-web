function Autenticacion (){
    this.storage = window.localStorage;
}

Autenticacion.prototype.isLogin = function(){
    if ('usuario' in this.storage){
        return true;
    } else {
        return false;
    }
};

/** TODO: Precisamente acá tenemos el primer envio POST  */
Autenticacion.prototype.login = function(usuario, contrasenia){
    if (usuario === contrasenia){
        this.storage.setItem('usuario', usuario);
    } 
};

Autenticacion.prototype.logout = function(){
    this.storage.removeItem('usuario');
};

export default Autenticacion;