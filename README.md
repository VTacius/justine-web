# justine-web
Un frontend web para una API que aún no existe

## Desarrollo:
Pues que ahora apuesto un poquito por Docker. A ver si no me arrepiento (Y para saltar esa opción, el Dockerfile da una idea de las pocas acciones a realizar)

La primera vez, será necesario instalar los paquetes propios de este paquete
docker run --rm -it -v $(pwd):/var/www  nodalpine yarn install

Luego, para verificarlo podemos ejecutarse de la siguiente forma:
docker run --rm -it -v $(pwd):/var/www -p 4000:8000 nodalpine

## Instalación:
Aún no aspiro a tratar este punto
