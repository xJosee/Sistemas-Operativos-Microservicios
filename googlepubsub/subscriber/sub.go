package main

import (
	"fmt"
	"context"
	
	"cloud.google.com/go/pubsub"
)

func main() {
	ctx := context.Background()
	client, err := pubsub.NewClient(ctx, "master-engine-305904")
	if err != nil {
		fmt.Println("Error cliente", err)
	}

	sub := client.Subscription("sub")

	err = sub.Receive(ctx, func(ctx context.Context, m *pubsub.Message) {
		s := string(m.Data)
		fmt.Println(m.ID,s)
		m.Ack()
	})
}

//export GOOGLE_APPLICATION_CREDENTIALS="../key.json"