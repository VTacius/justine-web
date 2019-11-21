<template>
    <div class="contenedor">
        <div class="panel">
            <slot></slot>
            <div class="controles">
                <!-- TODO: Se me ocurrió cuando esto estaba demasiado avanzado, pero la idea debería ser que los controles usen tan poco espacio como
                    les fuera posible, y que el restante espacio fuera usado precisamente por panel, es básicamnete la mejor idea posible pero te llevaría 
                    un poco más del tiempo que ya no tenés disponible.-->              
              <button class="success" :disabled="!botones.detalle" @click="activarPanel(1)"><i class="fas fa-info-circle"></i></button>
              <button class="success" :disabled="!(esAdmin && botones.edicion)" @click="activarPanel(2)"><i class="fas fa-edit"></i></button>
              <button class="error" :disabled="!(esAdmin && botones.borrado)" @click="activarPanel(3)"><i class="fas fa-trash"></i></button>
            </div>
        </div>
        <div class="contenido">
            <slot name="detalle" v-if="esActivo(1)"></slot>
            <slot name="edicion" v-if="esActivo(2)"></slot>
            <slot name="borrado" v-if="esActivo(3)"></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'VtPanel',
    props: {
        esAdmin: {
            type: Boolean,
            default: true
        },
        abiertoGlobal: {
            type: Boolean,
            default: false,
        },
        botones: {
            type: Object,
            default: function(){
                return {
                    detalle: true, 
                    edicion: true,
                    borrado: true
                }
            }
        }
    },
    data: function(){
        return {
            activoId: 0,
            activoGlobal: this.abiertoGlobal,
            activoLocal: false,
        }
    },
    methods: {
        esActivo(panelId){
            return panelId === this.activoId;
        },
        activarPanel(panelId){
            if(this.activoLocal){
                if (this.activoId === panelId) {
                    this.activoId = 0;
                    this.activoLocal = false;
                    this.$emit('abierto', false);
                } else {
                    this.activoId = panelId;
                }
            } else if(!this.activoGlobal && !this.activoLocal){
                this.activoLocal = true,
                this.activoId = (this.activoId === panelId) ? 0 : panelId;
                this.$emit('abierto', true);
            } 
        }
    },
    watch: {
        abiertoGlobal: function(valor){
            this.activoGlobal = valor;
        }
    }
}
</script>

<style lang="scss" scoped>

$boton-radio: 6px;
$boton-success-fondo: #41b883;
$boton-error-fondo: #df6b01;
$fuente-color: #333;
$boton-panel-color: #cbcbcb;

.panel {
    display: flex;
    flex: 100% 0 0;
    color: $fuente-color;
}

.controles {
    /* Sobre el como item */
    flex: 20% 0 0;
    /* Sobre él como contenedor */
    display: inline-flex;
    flex-flow: row nowrap;
    /* Los botones se salen un poco a veces */
    overflow: hidden;
}

.controles {
    flex: 20% 0 0;
    max-width: 20%;
    display: flex;
    flex-flow: column;
    overflow: hidden;
}

button {
    flex: 33.33% 0 0;
    padding: 0;
    margin: 0;
    color: $fuente-color;
    text-shadow: 0 0.0625rem 0.0625rem rgba(0, 0, 0, 0.2);
    font-size: 70%;
    border: none;
    padding: 0.12rem 0.5rem;
    box-sizing: border-box;
}

button:hover,
button:focus {
  outline: none;
  background-image: linear-gradient(
    transparent,
    rgba(0, 0, 0, 0.05) 40%,
    rgba(0, 0, 0, 0.1)
  );
}

button.success {
    background-color: $boton-success-fondo;
}

button.error {
    background-color: $boton-error-fondo;
}

button[disabled] {
    background-color: #cccccc;
    color: #666666;
}

button[disabled]:hover,
button[disabled]:focus {
  background-image: none;
}

@media screen and (min-width: 34.375rem) {
    .panel {
        border-bottom: $boton-panel-color solid 0.0625rem;
        padding: 0.5rem 0.4rem;
        margin: 0 0.2em;
        box-sizing: border-box;  
    }
  
    .controles {
        flex-flow: row nowrap;
    }

    button {
        flex: 33.33% 0 0;
        font-size: 90%;
        padding: 0.4rem 0.5rem;
    }

    button:first-child {
        border-right-width: 0;
        border-top-left-radius: $boton-radio;
        border-bottom-left-radius: $boton-radio;
    }

    button:last-child {
        border-left-width: 0;
        border-top-right-radius: $boton-radio;
        border-bottom-right-radius: $boton-radio;
    }
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