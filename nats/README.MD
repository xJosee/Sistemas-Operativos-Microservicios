## Contenido
- [NATS](#nats)
  * [Manual Técnico](#manual-técnico)
    + [Docker Compose](#docker-compose)
    + [Subscriber](#subscriber)
    + [Publisher](#publisher)
  * [Manual de usuario](#manual-de-usuario)
# NATS
Es un servicio de mensajería ocupado principalmente en aplicaciones nativas de la nube.

## Manual Técnico
### Docker Compose
Como sabemos NATS es un servicio especializado de mensajeria, al igual que este concepto tenemos la siguiente composición de **Docker Compose**
```yml
version: "3.3"
services:
  server-nats:
      image : nats
      container_name: server-nats
      networks: 
        -NATS
  publisher-nats:
      build: ./publisher
      restart: on-failure
      ports:
        - "4000:3000"
      depends_on:
        - server-nats
      networks: 
        -NATS
  subscriber-nats:
      build: ./subscriber
      restart: on-failure
      depends_on:
        - server-nats
      networks: 
        - NATS
networks: 
  NATS:
    driver: bridge
```
### Subscriber
#### Funciones
```go
func main()
```
Esta función escucha a lo largo del asunto *byNATS* del servidor de NATS, mensajes provenientes del Publisher, luego de recibirlos este se los envía a través de un solicitud HTTP al servidor que almacenara los datos.
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

CMD ["go", "run", "subscribe.go"]
```
### Publisher
#### Funciones
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
Está función se encarga de recibir las solicitudes HTTP de pacientes provinientes del tráfico y se encarga de enviar los nuevos pacientes a través del asunto *byNATS* del servidor de NATS.
#### Dockerfile
Para poder crear de mejor manera el contenedor, se opto por volver el paquete, un modulo para la correcta instalación de las dependencias del paquete
```Dockerfile
FROM golang

WORKDIR /

COPY . .

RUN go mod download

CMD ["go", "run", "publish.go"]
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
- Para detener la ejecución, bastara con:
```
^C
```
- Si se desea remover los contenedores  bastara con:
```
docker-compose down
```
