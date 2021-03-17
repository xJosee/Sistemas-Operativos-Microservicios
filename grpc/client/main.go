package main

import (
	"context"
	"fmt"
	pb "client/proto"
	"google.golang.org/grpc"
	"log"
	"github.com/gin-gonic/gin"
	"io/ioutil"
	"encoding/json"
)

func main() {
	
	address := "grpc-server:3000"
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
		
		res, _:= client.HandlerData(context.Background(), &structure)
		fmt.Println(res)
	});

	r.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{"message": "ok",})
	})

	r.Run(":4000")
}