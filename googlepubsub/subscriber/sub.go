package main

import (
	"fmt"
	"context"
	
	"cloud.google.com/go/pubsub"
	"net/http"
	"bytes"
)

func subscribe()  {
	//Create a context
	ctx := context.Background()

	//Create a new client using de project ID
	client, err := pubsub.NewClient(ctx, "master-engine-305904")
	if err != nil {
		fmt.Println("Error cliente", err)
	}
	//Now we're going to connect to the subscription called sub
	sub := client.Subscription("sub")

	//this method receives all the messages that were sent by the publisher
	err = sub.Receive(ctx, func(ctx context.Context, m *pubsub.Message) {
		//s := string(m.Data)
		fmt.Println(m.ID,string(m.Data))

		Body := bytes.NewBuffer(m.Data)
		http.Post("http://34.67.69.50:7000/postData", "application/json", Body)

		m.Ack()
	})
}

func main() {
	subscribe()
}

//IMPORTANT!!
//Before run the file, set the environmental variable
//export GOOGLE_APPLICATION_CREDENTIALS="./key.json"