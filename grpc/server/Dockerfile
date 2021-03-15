FROM golang:alpine as build-env

WORKDIR /client

COPY . .

RUN go mod download

CMD ["go", "run", "main.go"]

EXPOSE 3000