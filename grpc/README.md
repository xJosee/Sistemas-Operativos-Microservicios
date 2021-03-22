## Contenido
- [gRPC](#grpc)
  * [Manual Técnico](#manual-técnico)
    + [Docker Compose](#docker-compose)
    + [Client](#client)
    + [Server](#server)
  * [Manual de usuario](#manual-de-usuario)
# gRPC
gRPC es un marco de trabajo de Remote Procedure Call (RPC) moderno de código abierto de alto rendimiento que puede ejecutarse en cualquier entorno.
## Manual Técnico
### Docker Compose
Como sabemos NATS es un servicio especializado de mensajeria, al igual que este concepto tenemos la siguiente composición de **Docker Compose**
```yml
version: "3.3"
services:

  grpc-client:
      build: ./client
      ports:
        - "4000:4000"

  grpc-server:
      build: ./server
```
### Client
#### Funciones
```go
func main()
```
Debido a la necesidad de que se pudieran recibir mensajes de parte del Publisher, este paquete se instauro como **main** para poder realizarlo sin ninguna complicación.
#### Dockerfile
Para poder crear de mejor manera el contenedor, se opto por volver el paquete, un modulo para la correcta instalación de las dependencias del paquete
```Dockerfile
FROM golang:alpine as build-env

WORKDIR /client

COPY . .

RUN go mod download

CMD ["go", "run", "main.go"]

EXPOSE 4000
```
### Server
#### Funciones
```go
func main()
```
Debido a la necesidad de que se pudieran recibir mensajes de parte de una solicitud HTTP, este paquete se instauro como **main** para poder realizarlo sin ninguna complicación.
```go
func (*server) HandlerData(ctx context.Context, request *pb.ReqData) (*pb.ResData, error)
```
**Agregar**
#### Dockerfile
Para poder crear de mejor manera el contenedor, se opto por volver el paquete, un modulo para la correcta instalación de las dependencias del paquete
```Dockerfile
FROM golang:alpine as build-env

WORKDIR /server

COPY . .

RUN go mod download

CMD ["go", "run", "main.go"]

EXPOSE 3000
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