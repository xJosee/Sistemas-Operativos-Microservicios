# NATS
Como sabemos NATS es un servicio especializado de mensajeria, al igual que este concepto tenemos la siguiente composición de **Docker Compose**

```
version: "3.3"
services:
  server-nats:
      image : nats
      container_name: server-nats
  publisher-nats:
      build: ./publisher
      restart: on-failure
      ports:
        - "4000:3000"
      depends_on:
        - server-nats
  subscriber-nats:
      build: ./subscriber
      restart: on-failure
      depends_on:
        - server-nats
```


## Ejecución

- Para iniciar la composición debe de ejecutar:

```
docker-compose up
```
- Si se ha iniciado anteriormente y se han realizado modificaciones, se debe de ejecutar:
```
docker-compose up --build
```
- O si solo se desea reconstruir las imagenes solo se debe de correr:
```
docker-compose build
```
- Para detener la ejecucion, bastara con:
```
^C
```
- Si se desea remover los contenedores  bastara con:
```
docker-compose down
```
