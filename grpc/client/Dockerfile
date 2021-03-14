FROM golang:latest

# Install grpc
RUN go get -u google.golang.org/grpc && \
    go get -u github.com/golang/protobuf/protoc-gen-go

# Install protoc and zip system library
RUN apt-get update && apt-get install -y zip && \
    mkdir /opt/protoc && cd /opt/protoc && wget https://github.com/protocolbuffers/protobuf/releases/download/v3.7.0/protoc-3.7.0-linux-x86_64.zip && \
    unzip protoc-3.7.0-linux-x86_64.zip

ENV PATH=$PATH:$GOPATH/bin:/opt/protoc/bin

WORKDIR .

COPY . .

RUN go mod download

RUN protoc --go_out=plugins=grpc:. ./proto/covid.proto

EXPOSE 3000 4000

CMD [ "go", "run", "main.go" ]