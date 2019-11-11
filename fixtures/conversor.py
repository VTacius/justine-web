# Este script fue para un cambio bien primordial, y lo deje acá sólo porque me gustaría hacerlo
#  un día de estos con un enfoque más funcional
from json import load, dumps

fichero = open('db.json')
contenido = load(fichero)

usuarios = contenido['usuarios']

def buscar_valor(ests, uid):
    return [x for x in ests if x['value'] == uid]

def buscar_oficina(ests, o, ou):
    return [x for x in ests if x['value'] == ou and x['codest'] == o]

def buscar_grupos(est, uids):
    return [buscar_valor(est, x)[0] for x in uids]

for u in usuarios:
    o = u['o']
    u['o'] = buscar_valor(contenido['establecimientos'], o)
    u['ou'] = buscar_oficina(contenido['oficinas'], o, u['ou'])
    u['grupo'] = buscar_valor(contenido['grupos'], u['grupo'])
    u['grupos'] = buscar_grupos(contenido['grupos'], u['grupos'])

contenido['usuarios'] = usuarios
print(dumps(contenido, ensure_ascii=True, indent=4, sort_keys=True))
