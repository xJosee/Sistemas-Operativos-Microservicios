FROM node:14

WORKDIR /usr/src/app

RUN mkdir proc

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4000

RUN ls /proc

CMD [ "node", "index.js" ]