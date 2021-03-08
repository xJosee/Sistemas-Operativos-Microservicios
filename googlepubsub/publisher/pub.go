package main

import (
	"fmt"
	"context"
	
	"cloud.google.com/go/pubsub"
)

func publish(message string) {
	ctx := context.Background()
	client, err := pubsub.NewClient(ctx, "master-engine-305904")
	if err != nil {
		fmt.Println("Error cliente", err)
	}

	top := client.Topic("proyecto1")
	
	result := top.Publish(ctx, &pubsub.Message{Data:[]byte(message)})
	
	id, err := result.Get(ctx)
	if err != nil {
		fmt.Println("Error al publicar")
	}
	fmt.Println("Publicando: "+ id)
}

func main()  {
	publish("Probando desde pub.go 2")
}

//export GOOGLE_APPLICATION_CREDENTIALS="../key.json"