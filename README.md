# justine-web
Un frontend web para una API que aún no existe

## Desarrollo:
Corres un servidor de prueba
```sh
npm run serve
```

### Fixtures
Pues me valí de docker para disponer de algunos datos de prueba que podrían ayudar a dirigir el desarrollo de la aplicación:
```sh
cd fixtures
docker build . -t fjustine
docker run --rm -it -v $(pwd):/var/www -p 3000:3000 fjustine
```

## Instalación:
Aún no aspiro a tratar este punto
