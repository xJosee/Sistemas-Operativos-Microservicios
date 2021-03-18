FROM golang:alpine as build-env

WORKDIR /server

COPY . .

RUN go mod download

CMD ["go", "run", "main.go"]

EXPOSE 3000