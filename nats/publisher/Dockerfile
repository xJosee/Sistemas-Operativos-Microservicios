FROM golang

WORKDIR /

COPY . .

RUN go mod download

EXPOSE 3000

CMD ["go", "run", "publish.go"]