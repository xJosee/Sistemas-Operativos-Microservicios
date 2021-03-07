# Rabbit MQ
Como sabemos RabbitMQ es un servicio especializado de mensajeria, al igual que este concepto tenemos la siguiente composición de **Docker Compose**

```
version: "3.3"
services:
  server-rmq:
      image : rabbitmq:3-management
      ports: 
          - "5672:5672"
          - "15672:15672"
  publisher-rmq:
      build: ./publisher
      restart: on-failure
      ports:
        - "3100:3000"
      depends_on:
        - server-rmq
  consumer-rmq:
      build: ./consumer
      restart: on-failure
      depends_on:
        - server-rmq
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
