## Contenido
- [Locust](#locust)
  * [Manual Técnico](#manual-técnico)
    + [Registro de pacientes](#registro-de-pacientes)
    + [Funciones](#funciones)
  * [Manual de usuario](#manual-de-usuario)
    + [Instalación](#instalación)
    + [Ejecución](#ejecución)
    + [Configuración manual](#configuración-manual)
# Locust
Es una herramienta para poder simular tráfico en proyectos
## Manual Técnico
### Registro de pacientes
Antes de poder ejecutar el tráfico configurado, debemos de contar con el archivo *traffic.json* que cuenta con el formato:
```json
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
### Funciones
```python
def loadTraffic() -> List
```
Función que se encarga de cargar y regresar toda la información del archivo *traffic.json*, todo en un formato de tipo lista conteniendo diccionarios de python en su interior
```python
def on_start(self):
```
Una función de la clase **Patient**, el cual se encarga de emular la entrada del registro de un nuevo paciente
## Manual de usuario
### Instalación
Para poder hacer uso del simulador de tráfico Locust, se debe de instalar previamente este vía PIP:
- **Para Windows**
```
pip install locust
```
- **Para Linux**
```
pip3 install locust
```
### Ejecución
Para poder ejecutar el trafico configurado para Locust, debemos de ejecutar:
```
locust -f traffic.py
```
### Configuración manual
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
