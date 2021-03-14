FROM golang:latest

# Install dependecies
RUN go get -u google.golang.org/grpc 
RUN go get -u github.com/golang/protobuf/protoc-gen-go

WORKDIR /

COPY . .

EXPOSE 3000

CMD ["go", "run", "main.go"]