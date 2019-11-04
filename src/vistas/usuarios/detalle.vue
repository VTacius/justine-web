<script>
export default {
    name: 'vt-usuario-detalle',
    props: ['usuario', 'extendido'],
    created: function(){
        console.log('He sido creado');
    },
    mounted: function(){
        console.log('He sido montado');
    }

}
</script>
<template>
	<div class="pure-g">
        <div class="pure-u-1 pure-u-xl-3-5">
            <div class="pure-g">
                <!-- Este es un caso especial -->
                <div class="pure-u-1">
                   <dl class="atributo-titulo">
                       <dt>Contraseña:</dt>
                       <dd>{{usuario.userPassword}}</dd> 
                   </dl>
                </div>
                <div class="pure-u-1 pure-u-lg-1-2" v-show="extendido">
                   <dl>
                       <dt>Nombre:</dt>
                       <dd>{{usuario.givenName}}</dd> 
                   </dl>
                </div>
                <div class="pure-u-1 pure-u-lg-1-2" v-show="extendido">
                   <dl>
                       <dt>Apellido:</dt>
                       <dd>{{usuario.sn}}</dd> 
                   </dl>
                </div>
                <div class="pure-u-1 pure-u-lg-1-2">
                   <dl>
                       <dt>DUI:</dt>
                       <dd>{{usuario.dui}}</dd> 
                   </dl>
                </div>
                <div class="pure-u-1 pure-u-lg-1-2">
                   <dl>
                       <dt>NIT:</dt>
                       <dd>{{usuario.nit}}</dd> 
                   </dl>
                </div>
                <!-- TODO: Sólo si existe -->
                <div class="pure-u-1 pure-u-lg-1-2">
                   <dl>
                       <dt>JVS:</dt>
                       <dd>{{usuario.jvs}}</dd> 
                   </dl>
                </div>
                <div class="pure-u-1 pure-u-lg-1-2">
                   <dl>
                       <dt>Fecha de Nacimiento:</dt>
                       <dd>{{usuario.fecha}}</dd> 
                   </dl>
                </div>
            </div>
        </div>
        <div class="pure-u-1 pure-u-xl-2-5">
            <div class="pure-g">
                <div class="pure-u-1 pure-u-lg-1-2">
                   <dl>
                       <dt>Uso del buzón:</dt>
                       <dd>{{usuario.buzonVolumen}}</dd> 
                   </dl>
                </div>
            </div>
        </div>
    </div>
    
</template>