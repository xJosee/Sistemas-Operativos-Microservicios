package main

import (
	"encoding/json"
	"log"
	"net/http"

	nats "github.com/nats-io/nats.go"
)

func main() {
	startListening()
}

//showError show the error occours while executing
func showError(msg string, err error) {
	if err != nil {
		log.Fatalf("%s: %s", msg, err)
	}
}

//startListening starts listening every request on the port
func startListening() {
	http.HandleFunc("/", newPatient)
	log.Fatal(http.ListenAndServe(":3000", nil))
}

func newPatient(rw http.ResponseWriter, req *http.Request) {
	//Adding headers for send json
	rw.Header().Set("Content-Type", "application/json")

	//Parsing the body of response
	var body map[string]interface{}
	err := json.NewDecoder(req.Body).Decode(&body)
	showError("Parsing JSON", err)
	body["way"] = "NATS"
	data, err := json.Marshal(body)
	//Convert to text (to make more easy to transfer)
	dataOnString := string(data)

	//Create a connection
	nc, err := nats.Connect("server-nats")
	showError("Failed connection with NATS", err)
	defer nc.Close()

	//Publishing the message
	er := nc.Publish("byNATS", []byte(dataOnString))
	showError("Fail sending Message", er)

	log.Printf(" [x] Sent %s", dataOnString)

	//Returning response
	rw.WriteHeader(http.StatusCreated)
	rw.Write([]byte(dataOnString))
}
