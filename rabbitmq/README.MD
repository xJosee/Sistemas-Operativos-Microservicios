## Contenido
- [RabbitMQ](#rabbitmq)
  * [Manual Técnico](#manual-técnico)
    + [Docker Compose](#docker-compose)
    + [Consumer](#consumer)
    + [Publisher](#publisher)
  * [Manual de usuario](#manual-de-usuario)

# RabbitMQ
Según la misma descripción que da RabbitMQ, como su rol en el servicio de mensajeria este dice ser tanto el cartero, la oficina de correos y el buzón.

## Manual Técnico
### Docker Compose
Según el concepto dado anteriormente, utilizamos un **Docker Compose** para poder representar siendo el *server-rmq(Oficina de correos)*, *publisher-rmq(Cartero)* y *consumer-rmq(Buzón)*:
```yml
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
        - "4000:3000"
      depends_on:
        - server-rmq
  consumer-rmq:
      build: ./consumer
      restart: on-failure
      depends_on:
        - server-rmq
```
### Consumer
#### Método
```go
func main()
```
Esta función escucha a lo largo del canal *byRabbit* del servidor de RabbitMQ, mensajes provenientes del Publisher, luego de recibirlos este se los envía a través de un solicitud HTTP al servidor que los almacenara.
Debido a la necesidad de que se pudieran recibir mensajes de parte del Publisher, este paquete se instauro como **main** para poder realizarlo sin ninguna complicación.
```go
func showError(err error, msg string)
```
Está función se encarga de mostrar en la consola, cuando se produzca un error.

*Parámetros:*
- *err*: es el posible que se genero
- *msg*: es el mensaje de la operación que causo el posible error
#### Dockerfile
Para poder crear de mejor manera el contenedor, se opto por volver el paquete, un modulo para la correcta instalación de las dependencias del paquete
```Dockerfile
FROM golang

WORKDIR /

COPY . .

RUN go mod download

CMD ["go", "run", "receive.go"]
```
### Publisher
#### Método
```go
func main()
```
En esta función se inicia el servicio para escuchar mensajes provenientes de una solicitud HTTP.
Debido a la necesidad de que se pudieran recibir mensajes de parte de una solicitud HTTP, este paquete se instauro como **main** para poder realizarlo sin ninguna complicación.
```go
func startListening()
```
Está función se encarga de iniciar el servicio para solicitudes HTTP, configurando para esto una ruta donde se podrá recibir dichas solicitudes y colocando el puerto donde se escuchara como **3000**
```go
func showError(err error, msg string)
```
Está función se encarga de mostrar en la consola, cuando se produzca un error.

*Parámetros:*
- *err*: es el posible que se genero
- *msg*: es el mensaje de la operación que causo el posible error
```go
func newPatient(wr http.ResponseWriter, r *http.Request)
```
Está función se encarga de recibir las solicitudes HTTP de pacientes provinientes del tráfico y se encarga de enviar los nuevos pacientes a través del canal *byRabbit* del servidor de RabbitMQ.

#### Dockerfile
Para poder crear de mejor manera el contenedor, se opto por volver el paquete, un modulo para la correcta instalación de las dependencias del paquete
```Dockerfile
FROM golang

WORKDIR /

COPY . .

RUN go mod download

CMD ["go", "run", "send.go"]
```
## Manual de usuario

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
