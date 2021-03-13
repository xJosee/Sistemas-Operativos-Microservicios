package main

import (
	"log"
	"net"
	"./proto"
	"google.golang.org/grpc"
	"golang.org/x/net/context"
	"google.golang.org/grpc/reflection"
)

type Server struct{}

func main() {

	lis, err := net.Listen("tcp", ":3000")
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}

	s := proto.CovidServiceServer{}

	grpcServer := grpc.NewServer()

	proto.RegisterCovidServiceServer(grpcServer, &s)
	reflection.Register(grpcServer)

	if err := grpcServer.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %s", err)
	}
}

func (s *Server) handlerData(ctx context.Context, data *proto.CovidData) (*proto.CovidData, error) {
	return proto.CovidData{"name" : "test",location: "guatemala",age: "20",infected_type : "sexo",state : "mal"}, nil
}