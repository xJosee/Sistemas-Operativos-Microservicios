package main

import (
	"context"
	"fmt"
	pb "../proto"
	"google.golang.org/grpc"
	"log"
	"net"
)

type server struct {

}

func (*server) HandlerData(ctx context.Context, request *pb.ReqData) (*pb.ResData, error) {
	response := &pb.ResData{
		Name : request.GetName(),
		Location: request.GetLocation(),
		Age: request.GetAge(),
		InfectedType : request.GetInfectedType(),
		State : request.GetState(),
		Way : "GRPC",
	}
	return response, nil
}



func main() {
	address := "localhost:3000"
	lis, err := net.Listen("tcp", address)
	if err != nil {
		log.Fatalf("Error %v", err)
	}
	fmt.Printf("Server is listening on %v ...", address)

	s := grpc.NewServer()
	pb.RegisterCovidServiceServer(s, &server{})

	s.Serve(lis)
}