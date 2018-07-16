<script>
import moment,{ parseTwoDigitYear } from 'moment';
import Pikaday from 'pikaday';
export default {
    name: 'vt-fecha',
    props: ['uid', 'etiqueta', 'modelo'],
    mounted: function(){
        let hoy = moment();
        let fecha = moment(this.valor.valor, 'DD/MM/YYYY');

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
        
        this.picker = new Pikaday({
            field: document.getElementById('datepicker'),
            format: 'DD/MM/YYYY',
            onSelect: this.seleccion,
            i18n: local,
            yearRange
        });
        this.picker.setDate(fecha.toDate())
        this.picker.setMinDate(minDate.toDate());
        this.picker.setMaxDate(moment().toDate());

    },
    methods: {
        seleccion: function(evento){
            console.log('He seleccionado');
            console.log(evento);
            /* Por acá emito */
        },
        verificaCambio: function(fecha){
            console.log('Empiezo a ver si verifico o no');
            /*
            TODO: Un día que en serio no tengas nada que hacer, deberías verificar esto exhaustivamente
            console.log(fecha.target.value);
            console.log(this.modelo.valor);
            console.log(this.valor.valor);
            */
            if (fecha.target.value == this.valor.valor){
                console.log('Al parecer, acá no verifico nada');
            } else {
                let f = moment(fecha.target.value, 'DD/MM/YYYY');
                if (f.isValid()){
                    console.log('Si, es válido')
                    console.log(f);
                } else {
                    console.log('No es válido');
                    f = moment(this.modelo.valor, 'DD/MM/YYYY');
                    this.picker.setDate(f.toDate())
                }
                this.valor.valor = f; 
            }
        }
    },
    data: function(){
        return {
            valor: this.modelo,
            picker: ''
        }
    },
    
}
</script>
<template>
    <div class="pure-g jt-form-component">
        <label class="pure-u-1" v-bind:for="uid">{{etiqueta}}</label>
        <input class="pure-u-1" type="text" id="datepicker" v-on:change="verificaCambio">
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