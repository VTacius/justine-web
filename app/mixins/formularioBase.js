const formularioBase = {
    props: ['configuracion', 'modelo'],
    data: function(){
        idFormulario: '';
    },
    methods: {
        listarElementosVisibles: function(){
            let elementos = [];
            let f = document.getElementById(this.idFormulario);
            let ele = f.elements;
            for (let i = 0; i < ele.length; i++) {
                if(ele[i].type === 'text'){
                    elementos.push(ele[i].id);
                }
            };
            return elementos;

        },
        validacion: function(uid){
            if (typeof(this.configuracion)=== 'undefined'){
                return [];
            } else {
                let config = this.configuracion;
                let validacion = uid in config ? config[uid].validacion : [];
                return validacion;
            }
        }
    }
};

export default formularioBase;