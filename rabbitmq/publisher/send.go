package main

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/streadway/amqp"
)

//main start the producer
func main() {
	startListening()
}

//startListening starts listening every request on the port
func startListening() {
	http.HandleFunc("/", newPatient)
	log.Fatal(http.ListenAndServe(":3000", nil))
}

//showError show the error occours while executing
func showError(msg string, err error) {
	if err != nil {
		log.Fatalf("%s: %s", msg, err)
	}
}

//newPatient representing the entry of a new patient
func newPatient(wr http.ResponseWriter, r *http.Request) {
	//Adding headers for send json
	wr.Header().Set("Content-Type", "application/json")

	if r.Method == "GET" {
		wr.WriteHeader(http.StatusOK)
		wr.Write([]byte("{\"message\": \"ok\"}"))
		return
	}

	//Parsing the body of response
	var body map[string]interface{}
	err := json.NewDecoder(r.Body).Decode(&body)
	showError("Parsing JSON", err)
	body["way"] = "RabbitMQ"
	data, err := json.Marshal(body)
	//Convert to text (to make more easy to transfer)
	dataOnString := string(data)

	//Connecting to RabbitMQ Server
	conn, err := amqp.Dial("amqp://guest:guest@server-rmq:5672/")
	showError("RabbitMQ Server Connection", err)
	defer conn.Close()

	//Opening a channel
	ch, err := conn.Channel()
	showError("Open a channel on RabbitMQ", err)
	defer conn.Close()

	//Declaring/create a new queue
	queue, err := ch.QueueDeclare(
		"byRabbit",
		false,
		false,
		false,
		false,
		nil,
	)
	showError("Creating a queue in the channel", err)

	//Publish the info
	err = ch.Publish(
		"",
		queue.Name,
		false,
		false,
		amqp.Publishing{
			ContentType: "text/plain",
			Body:        []byte(dataOnString),
		},
	)
	showError("Publishing Info", err)
	log.Printf(" [x] Sent %s", dataOnString)

	//Returning response
	wr.WriteHeader(http.StatusCreated)
	wr.Write([]byte(dataOnString))
}
