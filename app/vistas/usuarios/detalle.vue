<script>
export default {
    name: 'vt-usuario-detalle',
    props: ['usuario'],
}
</script>
<template>
	<div class="pure-u-1">
        <dl>
            <dt class="jt-dt-titulo">Contraseña:</dt>
            <dd class="jt-dd-titulo">{{usuario.userPassword}}</dd>
        </dl>
        <dl>
            <dt>NIT:</dt>
            <dd>{{usuario.nit}}</dd>
        </dl>
        <dl>
            <dt>DUI:</dt>
            <dd>{{usuario.dui}}</dd>
        </dl>
        <dl>
            <dt class="jt-dt-titulo">{{usuario.pregunta}}</dt>
            <dd class="jt-dt-titulo">{{usuario.respuesta}}</dd>
        </dl>
        <dl>
            <dt class="jt-dt-titulo">Correo:</dt>
            <dd class="jt-dd-titulo">{{usuario.mail}}</dd>
        </dl>
    </div>
    
</template>