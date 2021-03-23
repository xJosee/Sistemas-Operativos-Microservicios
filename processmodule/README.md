## Contenido
- [Módulo de procesos](#módulo-de-procesos)
  * [Manual Técnico](#manual-técnico)
    + [Funciones](#funciones)
    + [Estructuras](#estructuras)
  * [Manual de usuario](#manual-de-usuario)
    + [Requisitos](#requisitos)
    + [Montaje](#montaje)
    + [Desmontaje](#desmontaje)
    + [Compilación](#compilación)
    + [Limpieza](#limpieza)

# Módulo de procesos
Modulo de procesos que da información de los procesos actuales
## Manual Técnico
### Funciones
```c
static int procShow(struct seq_file *m, void *v)
```
**Agregar**
```c
static ssize_t procWrite(struct file *file, const char __user *buffer, size_t count, loff_t *f_pos)
```
**Agregar**
```c
static int procOpen(struct inode *inode, struct file *file)
```
**Agregar**
```c
static int __init test_init(void)
```
**Agregar**
```c
static void __exit test_exit(void)
```
**Agregar**
### Estructuras
```c
static struct file_operations my_fops
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
$ ls /proc/procmodule
# Lectura de datos 
$ cat /proc/procmodule
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