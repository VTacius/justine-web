Vue.component('vt-usuario-edicion', {
    props: ['usuario'],
    methods: {
        envio: function(e){
            e.preventDefault();
        }
    },
    template: `
	<div class="pure-u-1">
        <form class="pure-form jt-form" @submit="envio" novalidate>
            <fieldset>
                <legend>Datos Generales</legend>
                <div class="pure-g">

                    <!-- Nombre (givenname) siempre es obligatorio. No vamos a crear usuario sin al menos un nombre válido -->
                    <div class="pure-u-1 pure-u-xl-1-2">
                        <div class="pure-g jt-form-component">
                            <label class="pure-u-1" for="givenname">Nombres</label>
                            <input class="pure-u-1" id="givenname" name="givenname" type="text" placeholder="Nombre" v-model:text="usuario.givenName" required sustantivos></input>
                        </div>
                    </div>
                       
                    <!-- Apellidos (sn) siempre es obligatorio, bajo las mismas condiciones que givenname -->
                    <div class="pure-u-1 pure-u-xl-1-2"> 
                        <div class="pure-g jt-form-component">
                            <label class="pure-u-1" for="sn">Apellidos</label>
                            <input class="pure-u-1" id="sn" name="sn" type="text" placeholder="Apellidos" v-model:text="usuario.sn" required sustantivos></input>
                        </div>
                    </div>
                   
                    <!-- DUI (dui) no es obligatorio en creación, en edición es obligatorio si ya ha sido configurado antes y con actualización siempre es obligatorio -->
                    <div class="pure-u-1 pure-u-xl-1-2">
                        <div class="pure-g jt-form-component">
                            <label class="pure-u-1" for="dui">DUI</label>
                            <input class="pure-u-1" id="dui" name="dui" type="text" placeholder="DUI" v-model:text="usuario.detalle.dui" dui ng-required="requerirCampo('dui')"></input>
                        </div>
                    </div>
                   
                    <!-- NIT (nit) no es obligatorio en creación, en edición es obligatorio si ya ha sido configurado antes y con actualización siempre es obligatorio -->
                    <div class="pure-u-1 pure-u-xl-1-2">
                        <div class="pure-g jt-form-component">
                            <label class="pure-u-1" for="nit">NIT</label>
                            <input class="pure-u-1" id="nit" name="nit" type="text" placeholder="NIT" v-model:text="usuario.detalle.nit" nit ng-required="requerirCampo('nit')"></input>
                        </div>
                    </div>
 
                </div>
            </fieldset>
    
            <div class="pure-g">
                <div class="pure-u-1">
                    <div class="pure-g jt-form-component">
                        <div class="pure-u-1-2 jt-contenedor-boton-izquierda">
                            <button type="submit" class="button-success jt-boton-formulario pure-button">Enviar</button>
                        </div>
                        <div class="pure-u-1-2 jt-contenedor-boton-derecha">
                            <button type="button" class="button-warning jt-boton-formulario pure-button">Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
    `
})
