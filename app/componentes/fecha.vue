<script>
import vtValidacion from './validacion.vue';
import Pikaday from 'pikaday';
import moment from 'moment';

export default {
    name: 'vt-fecha',
    components: { vtValidacion, moment, Pikaday },
    props: ['uid', 'etiqueta', 'modelo', 'validaciones'],
    data: function(){
        return {
            valor: this.modelo,
            picker: ''
        }
    },
    mounted: function(){
        let locale = {
            previousMonth : 'Mes anterior',
            nextMonth     : 'Mes siguiente',
            months        : ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
            weekdays      : ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'],
            weekdaysShort : ['Dom','Lun','Mar','Mie','Jue','Vie','Sab']
        }
        
        let hoy = moment();
        let minDate = hoy.subtract(100, 'years');
        
        let yearRange = [
            minDate.format('YYYY'),
            moment().format('YYYY')
        ];
        
        this.picker = new Pikaday({
            i18n: locale,
            field: document.getElementById('datepicker'),
            format: 'DD/MM/YYYY',
            keyboardInput: false,
            yearRange
        });
        
        this.picker.setMinDate(minDate.toDate());
        this.picker.setMaxDate(moment().toDate());

        let fecha = moment(this.valor, 'DD/MM/YYYY');
        this.picker.setDate(fecha.toDate())

    },
    methods: {
        /**
         * TODO: Por el momento, estamos obligando a que si se ha establecido fecha, esta no pueda borrarse. 
         * Esta un poco mal, el carácter de requerido debería ser verificado por otro medio 
         * TODO: Estas usando moment por el momento. Por acá ya habías querido prescindir de ella 
         *   let anio = fecha.getFullYear();
         *   let mes = fecha.getMonth();
         *   let dia = fecha.getDate();
         *   let valor = dia + '/' + mes + '/' + anio;
         */
        cambios: function(evento){

            let momento = moment(evento.target.value, 'DD/MM/YYYY');
            if (momento.isValid()){
                let valor = momento.format('DD/MM/YYYY');
                this.valor = valor;
            } else {
                let fecha = moment(this.valor, 'DD/MM/YYYY');
                let valor = fecha.isValid() ? fecha.format('DD/MM/YYY') : '' ;
                this.valor = ' ';
                this.valor = valor;
                this.picker.setDate(fecha.toDate())
            }
        }
    }
}
</script>
<template>
    <div class="pure-g jt-form-component">
        <label class="pure-u-1" v-bind:for="uid">{{etiqueta}}</label>
        <input class="pure-u-1" type="text" id="datepicker" v-on:change="cambios" autocomplete="off">
        <vt-validacion v-bind:uid="uid" v-bind:validaciones="validaciones" v-bind:valor="valor">
            <template slot="requerido"><slot name="requerido"></slot></template>
            <template slot="fecha"><slot name="fecha"></slot></template>
            <template slot="existente"><slot name="existente"></slot></template>
        </vt-validacion>
    </div>
    
</template>