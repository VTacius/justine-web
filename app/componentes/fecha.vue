<script>
import moment,{ parseTwoDigitYear } from 'moment';
import Pikaday from 'pikaday';
export default {
    name: 'vt-fecha',
    props: ['uid', 'etiqueta', 'modelo'],
    mounted: function(){
        let hoy = moment();
        let fecha = moment(this.modelo.valor, 'DD/MM/YYYY');

        let local = {
            previousMonth : 'Mes anterior',
            nextMonth     : 'Mes siguiente',
            months        : ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
            weekdays      : ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'],
            weekdaysShort : ['Dom','Lun','Mar','Mie','Jue','Vie','Sab']
        }
        
        let minDate = hoy.subtract(50, 'years');
        let yearRange = [
            minDate.format('YYYY'),
            moment().format('YYYY')
        ];
        
        var picker = new Pikaday({
            field: document.getElementById('datepicker'),
            format: 'DD/MM/YYYY',
            onSelect: this.envio,
            i18n: local,
            yearRange,
        });
        picker.setDate(fecha.toDate())
        picker.setMinDate(minDate.toDate());
        picker.setMaxDate(moment().toDate());

    },
    methods: {
        envio: function(e,f){
            console.log('Cambio algo');
            console.log(e);
        }
    },
    data: function(){
        return {
            valor: this.modelo
        }
    },
    
}
</script>
<template>
    <div class="pure-g jt-form-component">
        <label class="pure-u-1" v-bind:for="uid">{{etiqueta}}</label>
        <input type="text" id="datepicker">
        <div> <!-- Acá un ng-show si el formulario ha sido enviado o el elemento ya usado -->
            <label class="pure-u-1 jt-label-error" v-bind:for="uid" v-if="valor.error.requerido"> 
                <i class="fa fa-exclamation-triangle"></i><slot name="requerido">Campo requerido</slot>
            </label> 
            <label class="pure-u-1 jt-label-error" v-bind:for="uid" v-if="valor.error.sustantivo">
                <i class="fa fa-exclamation-triangle"></i><slot name="sustantivo">Revise el campo ingresado</slot>
            </label> 
            <label class="pure-u-1 jt-label-error" v-bind:for="uid" v-if="valor.error.existente">
                <i class="fa fa-exclamation-triangle"></i><slot name="existente">El campo no puede reemplazarse por un valor vacío</slot>
            </label> 
        </div>
    </div>
    
</template>