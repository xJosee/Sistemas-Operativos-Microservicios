package main

import (
	"bytes"
	"io/ioutil"
	"log"
	"net/http"

	"github.com/streadway/amqp"
)

//showError show the error occours while executing
func showError(err error, msg string) {
	if err != nil {
		log.Fatalf("%s: %s", msg, err)
	}
}

//main start the consumer
func main() {
	// Connecting to server
	conn, err := amqp.Dial("amqp://guest:guest@server-rmq:5672/")
	showError(err, "Failed to connect to RabbitMQ")
	defer conn.Close()

	// Openning a channel
	ch, err := conn.Channel()
	showError(err, "Failed to open a channel")
	defer ch.Close()

	// Declaring a new queue
	q, err := ch.QueueDeclare(
		"byRabbit",
		false,
		false,
		false,
		false,
		nil,
	)
	showError(err, "Failed to declare a queue")

	// Declaring a new consumer
	msgs, err := ch.Consume(
		q.Name,
		"",
		true,
		false,
		false,
		false,
		nil,
	)
	showError(err, "Failed to register a consumer")

	// Receiving messages
	forever := make(chan bool)

	go func() {
		for d := range msgs {
			log.Printf("Received a message: %s", d.Body)

			postBody := []byte(string(d.Body))
			req, err := http.Post("http://34.70.137.25:7000/postData", "application/json", bytes.NewBuffer(postBody))
			req.Header.Set("Content-Type", "application/json")
			showError(err, "POST new document")
			defer req.Body.Close()

			//Read the response body
			newBody, err := ioutil.ReadAll(req.Body)
			showError(err, "Reading response from HTTP POST")
			sb := string(newBody)
			log.Printf(sb)
		}
	}()

	log.Printf(" [*] Waiting for messages. To exit press CTRL+C")
	<-forever
}
