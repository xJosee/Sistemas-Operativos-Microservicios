## Contenido
- [Google PubSub](#google-pubsub)
  * [Manual Técnico](#manual-técnico)
    + [Docker Compose](#docker-compose)
    + [Subscriber](#subscriber)
    + [Publisher](#publisher)
  * [Manual de usuario](#manual-de-usuario)

# Google PubSub
Pub / Sub es un servicio de mensajería asincrónica que desacopla los servicios que producen eventos de los servicios que procesan eventos.

## Manual Técnico
### Docker Compose
```yml
version: "3.3"
services:
  publisher-pubsub:
    build: ./publisher
    restart: on-failure
    ports:
      - "4000:4000"
    networks: 
      - PubSub
  subscriber-pubsub:
    build: ./subscriber
    restart: on-failure
    networks: 
      - PubSub
networks: 
  PubSub:
    driver: bridge
```
### Subscriber
#### Funciones
```go
func main() 
```
Debido a la necesidad de que se pudieran recibir mensajes de parte del Publisher, este paquete se instauro como **main** para poder realizarlo sin ninguna complicación.
```go
func subscribe() 
```
Es un subscriptor que se mantiene escuchando todos los mensajes enviados por un publisher. Para poder realizarlo se crea un cliente el cual va recoger todos los mensajes enviados publicados, al leer estos mensajes se utiliza el metodo **ack()** que informa que fue reconocido satisfactoriamente. Posteriormente mediante una petición se envia la data recibida al server.
#### Dockerfile
Para poder crear de mejor manera el contenedor, se opto por volver el paquete, un modulo para la correcta instalación de las dependencias del paquete
```Dockerfile
FROM golang

WORKDIR /

COPY . .

ENV GOOGLE_APPLICATION_CREDENTIALS="./key.json"  

RUN go mod download

EXPOSE 4000

CMD ["go", "run", "sub.go"]
```
### Publisher
#### Funciones
```go
func main()
```
Debido a la necesidad de que se pudieran recibir mensajes de parte de una solicitud HTTP, este paquete se instauro como **main** para poder realizarlo sin ninguna complicación.
```go
func publish(message string)
```
Este metodo tiene como objetivo publicar un mensaje, se realiza mediante un cliente en el cual se hace referencia a un topico, una vez referenciado se procede a publicar el mensaje, es importante saber que el mensaje se publica a pesar que no hayan subscriptores disponibles.
```go
func homePage(w http.ResponseWriter, r *http.Request)
```
Es la ruta por defecto para solicitudes HTTP, es el encargado de publicar lo mensajes recibidos.
```go
func handleRequests()
```
Este metodo es encargado de iniciar un servidor el cual se encuentra escuchando en el puerto 4000, es el encargado del control de rutas y recibe las solicitudes realizadas.
#### Dockerfile
Para poder crear de mejor manera el contenedor, se opto por volver el paquete, un modulo para la correcta instalación de las dependencias del paquete
```Dockerfile
FROM golang

WORKDIR /

COPY . .

ENV GOOGLE_APPLICATION_CREDENTIALS="./key.json"  

RUN go mod download

EXPOSE 4000

CMD ["go", "run", "pub.go"]
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
