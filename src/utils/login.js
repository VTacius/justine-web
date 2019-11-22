import { obtener } from "./cookies";

class Autenticacion {
    
    isLogin() {
        return obtener('token') ? true : false;
    }

    guardarToken(){
        
    }
}


export default Autenticacion;