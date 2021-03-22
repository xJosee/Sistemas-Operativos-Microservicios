## Contenido
- [Módulo de procesos](#módulo-de-procesos)
  * [Manual Técnico](#manual-técnico)
    + [Funciones](#funciones)
    + [Estructuras](#estructuras)
  * [Manual de usuario](#manual-de-usuario)

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
- Para compilar todos los archivos, ejecutamos:
```bash
make all
```
- Para **Agregar**
```bash
make test
```