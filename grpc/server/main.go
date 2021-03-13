package main

import (
	"log"
	"net"
	"./proto"
	"google.golang.org/grpc"
	"golang.org/x/net/context"
	"google.golang.org/grpc/reflection"
	"fmt"
)

type covidServiceClient struct {
	cc grpc.ClientConnInterface
}

func main() {

	fmt.Println("Server is running")

	lis, err := net.Listen("tcp", ":3000")
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}

	var s proto.CovidServiceServer

	grpcServer := grpc.NewServer()

	proto.RegisterCovidServiceServer(grpcServer, s)
	reflection.Register(grpcServer)

	if err := grpcServer.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %s", err)
	}
}

func (c *covidServiceClient) HandlerData(ctx context.Context, in *proto.CovidData) (*proto.CovidData, error) {
	return in, nil
}