<template>
    <form class="formulario" id="idFormulario" novalidate>
        <div class="pure-u-1-2">
            <vt-autocompleta uid="grupos" etiqueta="Grupos" v-model="grupos.valor" :opciones="GruposDisponibles" :validaciones="['requerido']" multiple>
                <template slot="requerido">Debe escoger un establecimiento</template>
                <template slot="existente">No puede borrar el establecimiento. Escoja otro válido</template>
            </vt-autocompleta>
        </div>
        <div class="pure-u-1-2">
            <vt-entrada uid="uid" etiqueta="Username" ></vt-entrada>
        </div>
    </form>
</template>

<script>
import VtAutocompleta from './componentes/VtAutocompleta';
import VtEntrada from './componentes/entrada';
import { vhttp } from './utils/peticion'; 

export default {
    components :{ VtAutocompleta, VtEntrada },
    mounted: function () {
        console.log(vhttp);
        vhttp.get('/grupos').then(response => {
            this.GruposDisponibles = response.data;
        });
        vhttp.get('/usuarios/gsolis').then(response =>{
            console.log(response.data[0]);
            this.grupo.valor = response.data[0].grupo;
            this.grupos.valor = response.data[0].grupos;
        });
    },
    data: function(){
        return {
            grupos: {
                'valor': [], 
                'valido': true
            },
            grupo: {
                'valor': [], 
                'valido': true
            },
            GruposDisponibles: []
        };
    }
};
</script>

<style lang="scss" scoped>
    @import "../node_modules/font-awesome/css/font-awesome.css";
    @import "../node_modules/normalize.css/normalize.css";
    @import "./sass/variables.scss";
    html{
        font-size: 12px;
    } 
    form {
        background-color: $color-fondo;
    } 
    form {
        font-family: $fuente;
        width: 100%;
        display: flex;
        flex-flow: row wrap;
        align-items: baseline;
    }
    
    label {
        display: block;
        margin: 0.5rem 0rem 0.6rem;
        font-size: 0.84rem;
    } 
    .pure-u-1-2 {
        width: 50%;
    } 
    
</style>>