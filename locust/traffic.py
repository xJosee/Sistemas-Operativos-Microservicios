from typing import List
from locust import HttpUser, task, event
import json

#Index in the JSON
indexPatient = 0

def loadTraffic() -> List:
    with open('traffic.json') as tFile:          
        return json.load(tFile)

#List with patients
listPatients = loadTraffic()

class Patient(HttpUser):   
    def on_start(self):
        global indexPatient
        dataPatient = listPatients[indexPatient]
        #Handle indexBounds
        if indexPatient < len(listPatients) - 1:
            indexPatient += 1

        with self.client.post('/', json=dataPatient, catch_response = True) as res:
            print(dataPatient)
            if res.status_code == 200:
                print("OK!")

    @task
    def some_task(x):
        pass