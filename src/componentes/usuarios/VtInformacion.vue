<template>
    <div class="informacion">

        <div class="celda-uid">
            <p><i class="fas fa-at"></i>{{this.usuario.login}}</p>
        </div>

        <div class="celda-nombre">
            <p><i class="fas fa-user"></i>{{this.usuario.url}} {{this.usuario.sn}}</p>
        </div>

        <div class="celda-localidad">
            <!--<p><i class="fas fa-map-marker"></i><span v-show="this.tieneLocalidad"><em>{{this.oficina}}</em> en </span><strong>{{this.localidad}}</strong></p>-->
            <p><i class="fas fa-map-marker"></i>{{this.usuario.html_url}}</p>
        </div>

    </div>
  
</template>

<script>
export default {
    name: 'VtInformacionUsuario',
    props: ['usuario'],
    computed: {
        oficina: function(){
            try {
                return this.usuario.ou[0].label;
            } catch (error) {
                return '' 
            }
        },
        localidad: function(){
            try {
                return this.usuario.o[0].label;
            } catch (error) {
                return '' 
            }
        },
        tieneLocalidad: function(){
            return this.oficina !=='' && this.localidad !=='';
        }
    },

}
</script>

<style lang="scss" scoped>
$boton-radio: 6px;
$boton-success-fondo: #41b883;
$boton-error-fondo: #df6b01;
$fuente-color: #333;
$boton-panel-color: #cbcbcb;

p {
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.informacion {
    /* Parece ser la forma más exacta y necesaria de definir un tamaño exacto */
    flex: 80% 0 0;
    max-width: 80%;
    display: flex;
    align-items: center;
}

.informacion i.fas {
    padding: 0 0.45rem;
}

.celda-uid {
    flex: 20% 0 0;
    max-width: 20%; 
}

.celda-nombre {
    /* Esta parece ser la mejor forma de definir un tamaño expandible */
    flex: auto 1 0;
    max-width: 80%; 
}

.celda-localidad {
    display: none;
    flex: 50% 1 0;
    min-width: 0; 
}

@media screen and (min-width: 60rem) {
    .celda-nombre {
        flex: 30% 1 0;
        max-width: 30%; 
    }
    .celda-localidad {
        display: unset;
    }
}
 
</style>

</style> 