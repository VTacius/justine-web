Vue.component('vt-usuario-detalle', {
    props: ['usuario'],
    template: `
	<div class="pure-u-1">
        <dl>
            <dt class="jt-dt-titulo">Contraseña:</dt>
            <dd class="jt-dd-titulo">{{usuario.detalle.userPassword}}</dd>
        </dl>
        <dl>
            <dt>NIT:</dt>
            <dd>{{usuario.detalle.nit}}</dd>
        </dl>
        <dl>
            <dt>DUI:</dt>
            <dd>{{usuario.detalle.dui}}</dd>
        </dl>
        <dl>
            <dt class="jt-dt-titulo">{{usuario.detalle.pregunta}}</dt>
            <dd class="jt-dt-titulo">{{usuario.detalle.respuesta}}</dd>
        </dl>
        <dl>
            <dt class="jt-dt-titulo">Correo:</dt>
            <dd class="jt-dd-titulo">{{usuario.detalle.mail}}</dd>
        </dl>
    </div>
    `
})
