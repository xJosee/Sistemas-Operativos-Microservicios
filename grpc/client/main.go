package main

import (
	"context"
	"fmt"
	pb "./proto"
	"google.golang.org/grpc"
	"log"
	"github.com/gin-gonic/gin"
	"io/ioutil"
	"encoding/json"
)

func main() {
	
	address := "localhost:3000"
	opts := grpc.WithInsecure()
	cc, err := grpc.Dial(address, opts)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("Client is running")
	defer cc.Close()

	client := pb.NewCovidServiceClient(cc)

	r := gin.Default()
	r.POST("/", func(data *gin.Context) {

		var structure pb.ReqData;

		jsonData, _ := ioutil.ReadAll(data.Request.Body)
		json.Unmarshal(jsonData, &structure)

		client.HandlerData(context.Background(), &structure)

	});

	r.Run("localhost:4000")
}