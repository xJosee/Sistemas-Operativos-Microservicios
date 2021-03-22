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
  subscriber-pubsub:
    build: ./subscriber
    restart: on-failure
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
**Agregar**
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
**Agregar**
```go
func homePage(w http.ResponseWriter, r *http.Request)
```
**Agregar**
```go
func handleRequests()
```
**Agregar**
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
