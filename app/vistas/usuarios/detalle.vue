<script>
export default {
    name: 'vt-usuario-detalle',
    props: ['usuario'],
}
</script>
<template>
	<div class="pure-g">
        <!-- Este es un caso especial -->
        <div class="pure-u-1">
           <dl>
               <dt>Contraseña:</dt>
               <dd>{{usuario.userPassword}}</dd> 
           </dl>
        </div>
        <div class="pure-u-1 pure-u-lg-1-2">
           <dl>
               <dt>Nombre:</dt>
               <dd>{{usuario.givenName}}</dd> 
           </dl>
        </div>
        <div class="pure-u-1 pure-u-lg-1-2">
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
    
</template>