FROM alpine:3.8

# El espacio de trabajo, el espacio
RUN mkdir /var/www
VOLUME /var/www

# Instalación de los paquetes 
RUN apk add --no-cache yarn
RUN yarn global add http-server

# Configuración del funcionamiento
EXPOSE 8080
WORKDIR /var/www

RUN adduser -D --gecos "Usuario"  usuario
USER usuario

# El trabajo que ha de hacer
CMD ["http-server", "--hostname", "0.0.0.0", "--port", "8080"]
