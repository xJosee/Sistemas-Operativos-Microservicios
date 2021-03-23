## Contenido
- [Módulo de procesos](#módulo-de-procesos)
  * [Manual Técnico](#manual-técnico)
    + [Librerias](#librerias)
    + [Funciones](#funciones)
    + [Estructuras](#estructuras)
  * [Manual de usuario](#manual-de-usuario)
    + [Requisitos](#requisitos)
    + [Montaje](#montaje)
    + [Desmontaje](#desmontaje)
    + [Compilación](#compilación)
    + [Limpieza](#limpieza)

# Módulo de procesos
## Manual Técnico
### Librerias
```c
 // Librerias a cargar
#include <linux/module.h>
#include <linux/init.h>
#include <linux/kernel.h>
#include <linux/seq_file.h>
#include <linux/sched/signal.h>
#include <linux/proc_fs.h>
#include <linux/sched.h>
 ```

### Funciones
```c
static int procShow(struct seq_file *m, void *v)
{
    seq_printf(m, "[ ");
    //Mediante este metodo nativo se itera el proceso
    for_each_process(proc)
    {
        /*
          Se obtienen los siguientes atributos del proceso:
            -PID
            -Nombre
            -Estado
          Este no tiene padre
        */
        seq_printf(m, "\n{\"PadrePID\": \"-\", \"PID\": \"%d\", \"Nombre\": \"%s\", \"Estado\": \"%ld\"},",
                   proc->pid, proc->comm, proc->state);
        /*
          Mediate un list for each se pueden iterar los hijos
          para ello es necesario pasar por referencia el atributo 
          children el proceso padre
        */
        list_for_each(list, &proc->children)
        {
            /*
            Se obtienen los siguientes atributos del proceso hijo:
              -PID
              -Nombre
              -Estado
              -Nombre del padre
            */
            proc_child = list_entry(list, struct task_struct, sibling);
            seq_printf(m, "\n{\"PadrePID\": \"%d\", \"PID\": \"%d\", \"Nombre\": \"%s\", \"Estado\": \"%ld\"},", proc->pid,
                       proc_child->pid, proc_child->comm, proc_child->state);
        }
    }
    seq_printf(m, "]\n");

    return 0;
}
```
En este metodo escribe en un archivo secuencial los procesos se encuentran en el kernel. 
```c
static int procOpen(struct inode *inode, struct file *file)
```
Hace la llamada al metodo que ejecutara todas las tareas establecidas para el modulo cuando se encuentre insertado.
```c
static int __init test_init(void)
```
Esta llamada carga la función que se ejecutará en el init
```c
static void __exit test_exit(void)
```
Esta llamada carga la función que se ejecutará en el exit
### Estructuras
```c
static struct file_operations my_fops
```
Mediante esta estructura se establecen las tareas que se ejecutaran.
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

Para el montaje es necesario correr los siguientes comandos, el modulo se insertara en la carpeta /proc
```sh
$ make test
# Revisión de montaje correcto
$ ls /proc/procmodule
# Lectura de datos 
$ cat /proc/procmodule
```

### Desmontaje

Remueve el modulo del kernel

```sh
make remove
```

## Compilación

Compila el .c y genera todos los archivos necesarios para su ejecución.

```sh
make all
```

## Limpieza

Remueve todos los archivos de compilaciones anteriores

```sh
make clean
```