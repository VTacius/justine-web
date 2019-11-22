<script>
import vtValidacion from './VtValidacion.vue';
import Pikaday from 'pikaday';
import moment from 'moment';

export default {
    name: 'vt-fecha',
    components: { vtValidacion, moment, Pikaday },
    props: ['uid', 'etiqueta', 'modelo', 'validaciones'],
    data: function(){
        return {
            valor: this.modelo,
            guarnecido: this.modelo,
            valido: true,
            picker: ''
        }
    },
    mounted: function(){
        /**
         * TODO: Estas usando moment por el momento. Por acá ya habías querido prescindir de ella 
         *   let anio = fecha.getFullYear();
         *   let mes = fecha.getMonth();
         *   let dia = fecha.getDate();
         *   let valor = dia + '/' + mes + '/' + anio;
         */
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
            field: document.getElementById(this.uid),
            format: 'DD/MM/YYYY',
            keyboardInput: false,
            yearRange
        });
        
        this.picker.setMinDate(minDate.toDate());
        this.picker.setMaxDate(moment().toDate());

        let fecha = moment(this.valor, 'DD/MM/YYYY');
        this.picker.setDate(fecha.toDate());
    },
    watch:{
        modelo: function(valor){
            this.valor = valor;
        }
    },
    methods: {
        validar: function(validacion){
            this.valido = validacion;
            this.$emit('vt-cambio', this.uid, this.valor, this.valido);
        },
        cambios: function(evento){
            this.valor = evento.target.value;
        }
    }
}
</script>
<template>
    <div class="pure-g jt-form-component">
        <div class="pure-u-1">
            <label :for="uid">{{etiqueta}} <span v-if="!valido">Es inválido</span></label>
        </div>
        <div class="pure-u-1">
            <!-- TODO: Debería ir de esta forma:
            <input type="text" :id="uid" :value="valor" @change="cambios($event)" autocomplete="off">
            Si después de revisarlo con creación funciona bien, pues si, más que nada por orden -->
            <input type="text" :id="uid" @change="cambios($event)" autocomplete="off">
        </div>
        <vt-validacion :uid="uid" :validaciones="validaciones" :valor="valor" :valor-viejo="guarnecido" @vt-validar="validar">
            <template v-for="v in validaciones" :slot="v"><slot :name="v"></slot></template>
        </vt-validacion>
    </div>
    
</template>
