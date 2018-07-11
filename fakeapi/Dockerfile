FROM alpine:3.8

RUN mkdir /var/www
VOLUME /var/www

RUN apk add --no-cache yarn
RUN yarn global add json-server

EXPOSE 3000
WORKDIR /var/www

CMD ["json-server", "--watch", "db.json", "--routes", "routes.json", "--host", "0.0.0.0"]
