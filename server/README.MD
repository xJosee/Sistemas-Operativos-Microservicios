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
**Agregar**
```js
async readAllRecord(req, res)
```
**Agregar**
```js
async filterByWay(req, res)
```
**Agregar**
```js
async filterByRegion(req, res)
```
**Agregar**
### System Data
```js
getProcesos(req, res)
```
**Agregar**
```js
getRam(req, res)
```
**Agregar**
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
