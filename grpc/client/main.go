package main

import (
  	"github.com/gin-gonic/gin"
	"io/ioutil"
	"encoding/json"
	"google.golang.org/grpc"
	"./proto"
	"fmt"
)

func main() {

	conn, err := grpc.Dial("localhost:3000", grpc.WithInsecure())
	if err != nil {
		panic(err)
	}

	client := proto.NewCovidServiceClient(conn)

	r := gin.Default()

	r.POST("/", func(data *gin.Context) {	
		var structure proto.CovidData;
		jsonData, _ := ioutil.ReadAll(data.Request.Body)
		json.Unmarshal(jsonData, &structure)
		res, _ := client.HandlerData(data, &structure)
		fmt.Println(res);
	});

	r.Run(":4000")
}