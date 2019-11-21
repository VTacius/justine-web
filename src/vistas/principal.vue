<template>
    <vt-panel :usuario="usuarios[0]"></vt-panel>
</template>

<script>
import VtPanel from "@/componentes/VtPanel";
export default {
    name: 'Principal',
    components: { VtPanel },
    data: function(){
        return {
             'usuarios': [
                 {
                     'buzonStatus': true,
                     'buzonVolumen': 786432000,
                     'cuentaStatus': true,
                     'dui': '12345678-0',
                     'fecha': '16/11/1990',
                     'givenName': 'Francisco Alexander',
                     'grupo': [
                         {
                             'label': 'Administradores',
                             'value': 1001
                         }
                     ],
                     'grupos': [
                         {
                             'label': 'Administradores',
                             'value': 1001
                         },
                         {
                             'label': 'Navegaci\u00f3n Web',
                             'value': 1002
                         },
                         {
                             'label': 'Usuarios',
                             'value': 1005
                         }
                     ],
                     'jvs': '',
                     'loginShell': '/bin/bash',
                     'mail': 'alortiz@dominio.com',
                     'nit': '4444-666666-333-1',
                     'o': [
                         {
                             'label': 'Sede Central',
                             'value': '000'
                         }
                     ],
                     'ou': [
                         {
                             'codest': '000',
                             'label': 'Administraci\u00f3n',
                             'value': '01'
                         }
                     ],
                     'pregunta': '\u00bfQui\u00e9n soy?',
                     'respuesta': 'Soi io',
                     'sambaAcctFlags': false,
                     'sn': 'Figueroa Ortega & Garset',
                     'telephoneNumber': '7894',
                     'title': 'Profesor designado',
                     'uid': 'abcdefghijabcdefghijk',
                     'uidNumber': '1010',
                     'userPassword': 'Pass_2035'
                 },
                 {
                     'buzonStatus': true,
                     'buzonVolumen': 786432000,
                     'cuentaStatus': true,
                     'dui': '12345678-0',
                     'fecha': '16/11/1990',
                     'givenName': 'Carolina',
                     'grupo': [
                         {
                             'label': 'Navegaci\u00f3n Web',
                             'value': 1002
                         }
                     ],
                     'grupos': [
                         {
                             'label': 'Navegaci\u00f3n Web',
                             'value': 1002
                         },
                         {
                             'label': 'Usuarios',
                             'value': 1005
                         },
                         {
                             'label': 'Consumidor de WebServices',
                             'value': 1007
                         }
                     ],
                     'jvs': '',
                     'loginShell': '/bin/bash',
                     'mail': 'cpena@dominio.com',
                     'nit': '4444-666666-333-1',
                     'o': [
                         {
                             'label': 'Sede Central',
                             'value': '000'
                         }
                     ],
                     'ou': [
                         {
                             'codest': '000',
                             'label': 'Comunicaciones',
                             'value': '03'
                         }
                     ],
                     'pregunta': '\u00bfQui\u00e9n soy?',
                     'respuesta': 'Soi io',
                     'sambaAcctFlags': false,
                     'sn': 'Pe\u00f1a',
                     'telephoneNumber': '7894',
                     'title': 'Profesor designado',
                     'uid': 'cpena',
                     'uidNumber': '1020',
                     'userPassword': 'Pass_2045'
                 },
             ] 
         }
    }
}
</script>

<style lang="scss" scoped>

</style>