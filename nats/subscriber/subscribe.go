package main

import (
	"bytes"
	"io/ioutil"
	"log"
	"net/http"
	"time"

	nats "github.com/nats-io/nats.go"
)

func main() {
	//Create a connection
	nc, err := nats.Connect("server-nats")
	showError("Failed connection with NATS", err)
	defer nc.Close()

	//Subscribing
	sub, err := nc.SubscribeSync("byNATS")
	showError("Failed Subscribing", err)

	// Receiving messages
	forever := make(chan bool)

	go func() {
		for {
			msg, err := sub.NextMsg(1000 * 1000 * time.Hour)
			showError("Failed receiving message", err)

			req, err := http.Post("http://34.67.69.50:7000/postData", "application/json", bytes.NewBuffer(msg.Data))
			req.Header.Set("Content-Type", "application/json")
			showError("POST new document", err)
			defer req.Body.Close()

			//Read the response body
			newBody, err := ioutil.ReadAll(req.Body)
			showError("Reading response from HTTP POST", err)
			sb := string(newBody)
			log.Printf(sb)
		}

	}()

	log.Printf(" [*] Waiting for messages. To exit press CTRL+C")
	<-forever
}

//showError show the error occours while executing
func showError(msg string, err error) {
	if err != nil {
		log.Fatalf("%s: %s", msg, err)
	}
}
