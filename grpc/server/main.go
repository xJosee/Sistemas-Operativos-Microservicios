package main

import (
	"context"
	"fmt"
	pb "server/proto"
	"google.golang.org/grpc"
	"log"
	"net"
	"net/http"
	"encoding/json"
	"bytes"
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
	// mando al server de node la data
	jsonData, _ := json.Marshal(response)
	Body := bytes.NewBuffer(jsonData)
	http.Post("http://34.67.69.50:7000/postData", "application/json", Body)
	// retorno al cliente la data que envié
	return response, nil
}

func main() {
	address := ":3000"
	lis, err := net.Listen("tcp", address)
	if err != nil {
		log.Fatalf("Error %v", err)
	}
	fmt.Printf("Server is running")

	s := grpc.NewServer()
	pb.RegisterCovidServiceServer(s, &server{})

	s.Serve(lis)
} 