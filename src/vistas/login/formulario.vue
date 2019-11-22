<template>
    <form id="login" @submit="this.envio" novalidate>
        <vt-entrada class="elemento" uid="usuario" v-model="form.usuario" etiqueta="Usuario" :validaciones="['requerido']" :errores="errores.usuario"></vt-entrada>
        <vt-entrada class="elemento" uid="password" v-model="form.password" etiqueta="Contraseña" :validaciones="['requerido']" :errores="errores.password" password></vt-entrada>
        <div class=controles>
            <input type="submit" value="Enviar" >
        </div>
    </form>
</template>
<script>
import VtEntrada from "@/componentes/formularios/VtEntrada";
import VtFormulario from "@/componentes/bases/VtFormulario";
export default {
    name: 'LoginFormulario',
    components: { VtEntrada },
    extends: VtFormulario,
    data: function(){
        return {
            endpoint: '/login/auth'
        }
    },
    methods: {
        procesarRespuesta: function(valor){
            console.log('Saludos desde descendiente Respuesta');
            console.log(valor);
            this.$emit('login', valor);
        },
        procesarError: function(valor){
            console.log('Saludos desde descendiente Error');
            console.log(valor);
        }
    }
}
</script>
<style lang="scss" scoped>
    form {
        width: 100%;
    }
    
    .elemento {
        padding: 0.8rem 0 0.4rem;
    }

    .controles {
        text-align: center;
    }
</style>