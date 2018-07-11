# justine-web
Un frontend web para una API que aún no existe

## Desarrollo:
Pues que ahora apuesto un poquito por Docker. A ver si no me arrepiento (Y para saltar esa opción, el Dockerfile da una idea de las pocas acciones a realizar)

La primera vez, será necesario instalar los paquetes propios de este paquete
```sh
 docker run --rm -it -v $(pwd):/var/www  nodalpine yarn install
```

Luego, para verificarlo podemos ejecutarse de la siguiente forma:
```sh
 docker run --rm -v $(pwd):/var/www -p 4000:8080 nodalpine
```

Agregando la `-it` la consola nos muestra colores. 
```sh
 docker run --rm -it -v $(pwd):/var/www -p 4000:8000 nodalpine
```

### Fake API
En realidad, la mejor forma de tratar este tipo de cosas es mockeando datos desde pruebas automatizadas. Como sea.
```sh
cd fakeapi
docker build . -t apilne
docker run --rm -v $(pwd):/var/www -p 3000:3000 apilne 
```

En realidad, todavía estoy que trabajo en ello. Básicamente son necesarios un par de pasos adicionales
```sh
docker network create webtest
docker swarm init
docker stack deploy  -c docker-compose.yml  webtest

# De hecho, lo anterior no es del todo necesario siempre y cuando se quiera hacer algo más manual
docker run --rm -it --net webtest -p 4000:8080 -v $(pwd):/var/www --name web nolpine
docker run --rm -it --net webtest -p 3000:3000 -v $(pwd):/var/www --name api apilne
```

## Instalación:
Aún no aspiro a tratar este punto
