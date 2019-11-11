<template>
    <div class="componente">
        <div class="elemento">
            <label :for="uid">{{etiqueta}}</label>
        </div>
        <div class="elemento">
            <label class="switch">
                <input :id="uid" :name="uid" type="checkbox" :checked="valor" @change="cambios($event, valor)">
                <span class="slider"></span>
                <span class="texto">
                    <span class="off">
                        <i class="fa fa-ban"></i>{{msgFalso}}
                    </span>
                    <span class="on">
                        <i class="fa fa-check"></i>{{msgVerdadero}}
                    </span>
                </span> 
            </label> 
        </div>
    </div>
</template>
<script>
export default {
    name: 'VtSwitch',
    props: ['uid', 'modelo', 'etiqueta', 'msgFalso', 'msgVerdadero'],
    data: function(){
        return {
            valor: this.modelo
        };
    },
    watch: {
        modelo: function(valor){
            this.valor = valor;
        }
    },
    methods: {
        cambios: function(evento, valor){
            /** TODO: Recuerda que el false significa invalido = false 
             *  ¿Viteh! No entiendo el porque de esto 
             */
            this.$emit('vt-cambio', this.uid, valor, false);
        }
    },
    
};
</script>
<style lang="scss" scoped>
$slider-color: #d9dbdd;
$disable-color: #92969d;
$active-color: #4c596c;
$pausa: 0.4s;
$ancho-borde: 0.14em;

input {
    visibility: hidden;
}

.switch {
    z-index: 1;
    width: 100%;
    height: 100%;
    position: relative;
    display: inline-block;

}

span.slider {
    z-index: -1;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    cursor: pointer;
    background-color: $disable-color;
    width: 100%;
    height: 100%;
    transition: $pausa;

    /* Un poco de borde se ve bien */

    box-sizing: border-box;
    /* Color por defecto para barra  */
    border: solid $ancho-borde $disable-color;
}

span.slider::before {
    z-index: 3;
    position: absolute;
    height: 100%;
    width: 50%;
    content: "";
    background-color: $slider-color;
    transition: $pausa;
}

input:checked + span.slider {
    background-color: $active-color;
    border: solid $ancho-borde $active-color;
}

input:checked + span.slider::before {
    transform: translateX(100%);
}

span.texto {
    /* Define su propia posición */
    position: absolute;
    top: 0;
    bottom: 0;
    /* Define la posición de sus hijos, los otros span */
    display: flex;
    align-items: center;
    width: 100%;
}

span.texto .on,
span.texto .off {
    width: 50%;
    display: block;
    text-align: center;
    margin-top: ($ancho-borde / 2);
}

i.fa {
    margin-right: $ancho-borde;
}
</style>