const formularioBase = {
    props: ['configuracion', 'modelo'],
    data: function(){
        return {
            idFormulario: '',
            cambios: {},
            valido: true,
            editado: false,
        };
    },
    methods: {
        /**
         * Más que visibles, se trata de los elementos que efectivamente se han montado
         */
        listarElementosVisibles: function(){
            let elementos = [];
            let f = document.getElementById(this.idFormulario);
            let ele = f.elements;
            for (let i = 0; i < ele.length; i++) {
                if(ele[i].type === 'text'){
                    elementos.push(ele[i].id);
                }
            }
            return elementos;

        },
        /**
         * Almancenamos los cambios conforme el usuario los ingresa; o luego, si forzamos
         * la validación de dichos datos 
         */
        registrarCambio(uid, valor, validacion){
            console.log('formulario: He registrado un cambio de valor en ' + uid + ' por ' + valor + ' la cual es ' + validacion);
            this.cambios[uid] = {
                valor,
                validacion
            };
        },
        /**
         * Obtiene la lista de validaciones que deben hacerse sobre dicho objeto
         */
        validacion: function(uid){
            if (typeof(this.configuracion)=== 'undefined'){
                return [];
            } else {
                let config = this.configuracion;
                let validacion = uid in config ? config[uid].validacion : [];
                return validacion;
            }
        },
        /**
         * Algunos componentes como fieldset se encuentran en un compartimento diferente, 
         * los controles de formulario suelen llevar la configuración consigo mismos
         */
        mostrar: function(elemento){
            let cfg = this.configuracion; 
            let config = elemento in cfg.componentes ? cfg.componentes : cfg;
            /** Por defecto, vamos a mostrar todos los componentes */
            let mostrar = elemento in config ? config[elemento].mostrar : true;
            return mostrar;
        }
    }
};

export default formularioBase;