FROM alpine:3.8

ARG ID

# El espacio de trabajo, el espacio
RUN mkdir /var/www
VOLUME /var/www

# Instalación de los paquetes 
RUN apk add --no-cache yarn
RUN yarn global add http-server &&\
 yarn global add webpack &&\
 yarn global add webpack-cli &&\
 yarn global add webpack-dev-server  

# Configuración del funcionamiento
EXPOSE 8080
WORKDIR /var/www

RUN adduser -D -u ${ID:-1000} usuario
USER usuario

# El trabajo que ha de hacer
CMD ["yarn", "dev"]
