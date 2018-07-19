# justine-web
Un frontend web para una API que aún no existe

## Desarrollo:
Pues que ahora apuesto un poquito más por Docker. A ver si no me arrepiento (Y para saltar esa opción, el Dockerfile da una idea de las pocas acciones a realizar)

Construimos a nodalpine
```sh
docker build . -t nodalpine --build-arg ID=$(id -u)
```

La primera vez, será necesario instalar los paquetes propios de este paquete
```sh
docker run --rm -it -v $(pwd):/var/www:z nodalpine yarn install
```

Lo corremos de la siguiente forma (Por alguna extraña razón que aún no entiendo, no envia el build a nuestro equipo. Pese a ello, funciona perfectamente)
```sh
docker run --rm -it -v $(pwd):/var/www:z -p 4000:8080 nodalpine
```

Desde nuestro equipo, podemos acceder en el navegador desde `http://127.0.0.1:4000/webpack-dev-server/`. Gracias a `/webpack-dev-server`, somos capaces de un par de cosas como debugear (console.log() a morir) desde el navegador, y que este se recargue con cada cambio que hacemos

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
