package main

import (
	"fmt"
	"context"
	"log"
    "net/http"
	"encoding/json"
	"cloud.google.com/go/pubsub"
)
//Struct to save messages
type Msg struct {
    Value string
}

func publish(message string) {
	//Create a context
	ctx := context.Background()
	//Create a new client using de project ID
	client, err := pubsub.NewClient(ctx, "master-engine-305904")
	if err != nil {
		fmt.Println("Error cliente", err)
	}
	//Now we're going to connect to the topic called proyecto1, this will help us to publish messages soon
	top := client.Topic("proyecto1")
	
	//After we connected to the topic, we now have to publish a messege 
	result := top.Publish(ctx, &pubsub.Message{Data:[]byte(message)})
	
	//We get the result of the last step
	id, err := result.Get(ctx)
	if err != nil {
		fmt.Println("Error al publicar")
	}
	//If all went corretly, we print the id of the message
	fmt.Println("Publicando: "+ id)
}

func homePage(w http.ResponseWriter, r *http.Request){
    fmt.Fprintf(w, "Welcome!")
	//Create a var, this will help us to get all the attributes of the body
	var m Msg
	//Pass by reference the var, this step saves all the values in the struct
	err := json.NewDecoder(r.Body).Decode(&m)
	if err != nil {
        http.Error(w, err.Error(), http.StatusBadRequest)
        return
    }
	publish(m.Value)
}

func handleRequests() {
    http.HandleFunc("/", homePage)
    log.Fatal(http.ListenAndServe(":5000", nil))
}
func main()  {
	handleRequests()
}


//IMPORTANT!!
//Before run the file, set the environmental variable
//export GOOGLE_APPLICATION_CREDENTIALS="../key.json"