#include <linux/module.h>
#include <linux/init.h>
#include <linux/kernel.h>
#include <linux/proc_fs.h>
#include <linux/sched.h>
#include <linux/uaccess.h>
#include <linux/fs.h>
#include <linux/sysinfo.h>
#include <linux/seq_file.h>
#include <linux/slab.h>
#include <linux/mm.h>
#include <linux/swap.h>
#include <linux/timekeeping.h>

MODULE_LICENSE("GPL");
MODULE_AUTHOR("Jose Eduardo Moran");
MODULE_DESCRIPTION("Modulo que muestra propiedades de ram");


struct sysinfo memstruct;
long total;
long freer;

static int procShow(struct seq_file *m, void *v)
{
    
    si_meminfo(&memstruct);
    
    total = memstruct.totalram * 4;
    freer = memstruct.freeram * 4;
    seq_printf(m, "{\"Total\":\"%lu\", \"Libre\":\"%lu\"}", total, freer);
    return 0;
}

static ssize_t procWrite(struct file *file, const char __user *buffer, size_t count, loff_t *f_pos)
{
    return 0;
}

static int procOpen(struct inode *inode, struct file *file)
{
    return single_open(file, procShow, NULL);
}


static struct file_operations my_fops = {
    .owner = THIS_MODULE,
    .open = procOpen,
    .read = seq_read,
    .write = procWrite
};

static int __init test_init(void)
{
    struct proc_dir_entry *entry;
    entry = proc_create("rammodule", 0777, NULL, &my_fops);
    if (!entry)
    {
        return -1;
    }
    else
    {
        printk(KERN_INFO "@rammodule corriendo\n");
    }
    return 0;
}

static void __exit test_exit(void)
{
    remove_proc_entry("rammodule", NULL);
    printk(KERN_INFO "@rammodule finalizado\n");
}

module_init(test_init);
module_exit(test_exit);