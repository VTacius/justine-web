<template>
    <div class="contenedor">
        <div class="login">
            <login-formulario :datos="datos" @login="procesamiento"></login-formulario>
        </div>
    </div>
</template>

<script>
import LoginFormulario from "@/vistas/login/formulario";
export default {
    name: 'login',
    components: { LoginFormulario },
    props: {
        redireccion: {
            type: String,
            default: ''
        }
    },
    data: function(){
        return {
            datos: {
                usuario: '',
                password: ''
            }
        }
    },
    methods: {
        procesamiento: function(valor){
            console.log('Saludos desde el descendiente');
            /** Emitimos para cambiar los valores en todo */
            this.$emit('logueo', valor);
            /** Ya después de hacer nuestra parte, nos vamos */
            let redireccion = this.redireccion.length > 0 ? this.redireccion : '/';
            this.$router.push(redireccion);
        }
    }
}
</script>

<style lang="scss" scoped>
    .contenedor {
        width: 100%;
        height: 100%;
        display: flex;
        flex-flow: row wrap;
        justify-content: center;
        align-content: center;
    }

    .login {
        flex: 0 0 40%;
    }
</style>