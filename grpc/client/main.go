package main

import (
	"context"
	"fmt"
	pb "../proto"
	"google.golang.org/grpc"
	"log"
	"github.com/gin-gonic/gin"
	"io/ioutil"
	"encoding/json"
)

func main() {
	fmt.Println("Hello client ...")

	opts := grpc.WithInsecure()
	cc, err := grpc.Dial("localhost:3000", opts)
	if err != nil {
		log.Fatal(err)
	}
	defer cc.Close()

	client := pb.NewCovidServiceClient(cc)

	r := gin.Default()
	r.POST("/", func(data *gin.Context) {
		
		var structure pb.ReqData;

		jsonData, _ := ioutil.ReadAll(data.Request.Body)
		json.Unmarshal(jsonData, &structure)

		resp, _ := client.HandlerData(context.Background(), &structure)
		fmt.Printf("Receive response => [%v]", resp)

	});

	r.Run(":4000")
}