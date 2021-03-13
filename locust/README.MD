# Locust
## Instalación
Para poder hacer uso del simulador de tráfico Locust, se debe de instalar previamente este vía PIP:
- **Para Windows**
```
pip install locust
```
- **Para Linux**
```
pip3 install locust
```
## Registro de pacientes
Antes de poder ejecutar el tráfico configurado, debemos de contar con el archivo *traffic.json* que cuenta con el formato:
```
[
    {
        "name": "Francisco Suarez",
        "location": "Escuintla",
        "age": 21,
        "infectedtype": "non-imported",
        "state": "symptomatic"
    },
    {
        "name": "Karen Ixcoy",
        "location": "Quiché",
        "age": 21,
        "infectedtype": "communitary",
        "state": "asymptomatic"
    },
    ...
]
```
## Ejecución
Para poder ejecutar el trafico configurado para Locust, debemos de ejecutar:
```
locust -f traffic.py
```
## Configuración manual
Para hacer uso de Locust en modo consola, podemos configurar previamente el archivo *locust.conf*:
```
#Usuarios totales
users = 1000
#Cantidad de usuarios por segundo
spawn-rate = 100
#Tiempo de corrida
run-time = 10m
#Sin interfaz grafica
headless = true
#Definir host
host = http://host.com
```
