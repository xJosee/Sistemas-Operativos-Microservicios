## Contenido
- [API REST](#api-rest)
  * [Manual Técnico](#manual-técnico)
    + [Docker Compose](#docker-compose)
    + [COVID Data](#covid-data)
    + [System Data](#system-data)
    + [DockerFile](#dockerfile)
  * [Manual de usuario](#manual-de-usuario)
# API REST
A cargo de mantener los datos a salvo de los pacientes y recuperarlo para cuando sea necesario

## Manual Técnico
### Docker Compose
Como sabemos NATS es un servicio especializado de mensajeria, al igual que este concepto tenemos la siguiente composición de **Docker Compose**
```yml
version: "3.3"
services:
  node-api:
    build: .
    restart: always
    ports:
      - "7000:7000"
    links:
      - mongo-db
    volumes:
      - /proc:/usr/src/app/proc
  mongo-db:
    image: mongo
    restart: always
    ports:
      - "27017:27017"
    logging:
      driver: "none"
```
### COVID Data
```js
async createRecord(req, res)
```
Crea un nuevo registro para la base de datos

*Parámetros*:
- *req*: Solicitud HTTP entrante
- *res*: Respuesta HTTP saliente
```js
async readAllRecord(req, res)
```
Retorna todos los registros que se encuentren en la base de datos

*Parámetros*:
- *req*: Solicitud HTTP entrante
- *res*: Respuesta HTTP saliente
```js
async filterByWay(req, res)
```
Filtra según el middleware por el cual se hayan enviado los registros

*Parámetros*:
- *req*: Solicitud HTTP entrante
- *res*: Respuesta HTTP saliente
```js
async filterByRegion(req, res)
```
Filtra según la región de Guatemala, donde se haya registrado al paciente. Para más información de las regiones en las que se dividieron, vistar [aquí](https://es.wikipedia.org/wiki/Organizaci%C3%B3n_territorial_de_Guatemala)

*Parámetros*:
- *req*: Solicitud HTTP entrante
- *res*: Respuesta HTTP saliente
### System Data
```js
getProcesos(req, res)
```
Retorna la salida generada por el módulo el cual lee los procesos

*Parámetros*:
- *req*: Solicitud HTTP entrante
- *res*: Respuesta HTTP saliente
```js
getRam(req, res)
```
Retorna la salida generada por el módulo el cual lee la memoria RAM

*Parámetros*:
- *req*: Solicitud HTTP entrante
- *res*: Respuesta HTTP saliente
### DockerFile
```Dockerfile
FROM node:14

WORKDIR /usr/src/app

RUN mkdir proc

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4000

CMD [ "node", "index.js" ]
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
