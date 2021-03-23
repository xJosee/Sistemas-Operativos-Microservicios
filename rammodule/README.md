## Contenido
- [Modulo de Memoria Ram](#modulo-de-memoria-ram)
  * [Manual Técnico](#manual-técnico)
  * [Manual de usuario](#manual-de-usuario)
    + [Requisitos](#requisitos)
    + [Montaje](#montaje)
    + [Desmontaje](#desmontaje)
    + [Compilación](#compilación)
    + [Limpieza](#limpieza)
# Modulo de Memoria Ram
> Provee datos escenciales de memoria ram en tiempo de ejecución.

Este modulo es capaz de ser montado y desmontado por medio de un archivo Makefile, el cual tambien permite la compilacion y limpieza del modulo. Los datos mostrados son:
* Memoria ram libre en mb
* Memoria ram total en mb
* Memoria ram usada en mb
* Memoria ram usada en porcentaje

## Manual Técnico
El codigo se encuentra estructurado por las siguientes librerias:
 ```c
 // Librerias a cargar
#include <linux/module.h>
#include <linux/init.h>
#include <linux/kernel.h>
// Libreria para obtener datos de memoria ram
#include <linux/mm.h>
 ```

```c
// Por medio del siguiente metodo se pasa por referencia una variable de tipo syinfo,
// en la cual se almacenaran todos los datos recopilados de la memoria ram
si_meminfo(&memstruct); 

// Dato que el memstruct no retorna los valores en bytes, se realiza una multiplicacion 
// para hacer la conversión
total = memstruct.totalram * 4;
freer = memstruct.freeram * 4;

// Se escribe en el archivo secuencial m (Por conveniencia en este caso se escribe en
// formato json ya que seran los datos enviados a la API).
seq_printf(m, "{\"Total\":\"%lu\", \"Libre\":\"%lu\"}", total, freer);
```

## Manual de usuario
### Requisitos

Verificar si los headers se encuentran instalados
```sh
$ apt search linux-headers-$(uname -r) 
```
En caso no se encuentren instalados, se deben instalar a travez del siguiente comando:
```sh
$ sudo apt install linux-headers-$(uname -r)
```
Instalar make y gcc para la compilación
```sh
# Instala make
$ sudo apt install make
# Instala gcc
$ sudo apt install gcc
```

### Montaje

Linux:
Para el montaje es necesario correr los siguientes comandos, el modulo se insertara en la carpeta /proc
```sh
$ make test
# Revisión de montaje correcto
$ ls /proc/rammodule
# Lectura de datos 
$ cat /proc/rammodule
```

### Desmontaje

Linux:

```sh
make remove
```

### Compilación

Linux:

```sh
make all
```

### Limpieza

Linux:

```sh
make clean
```