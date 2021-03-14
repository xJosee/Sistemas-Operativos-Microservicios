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
#include <linux/sched/signal.h>

MODULE_LICENSE("GPL");
MODULE_AUTHOR("Jose Eduardo Moran");
MODULE_DESCRIPTION("Modulo que muestra procesos");

struct task_struct *proc, *proc_child;
struct list_head *list;
static int procShow(struct seq_file *m, void *v)
{
    
    seq_printf(m, "[ ");
    for_each_process(proc){       
        list_for_each(list, &proc->children){
            proc_child = list_entry( list, struct task_struct, sibling );
            if(list->prev == &proc->children){                
                seq_printf(m,"\n{\"PadrePID\": \"-\", \"PID\": \"%d\", \"Nombre\": \"%s\", \"Estado\": \"%ld\"},",
                    proc->pid, proc->comm, proc->state);
            }    
            seq_printf(m,"\n{\"PadrePID\": \"%d\", \"PID\": \"%d\", \"Nombre\": \"%s\", \"Estado\": \"%ld\"},", proc->pid, 
                proc_child->pid, proc_child->comm, proc_child->state);
        }	
        
    }
    seq_printf(m, "]\n");

    
    //pid
    //com
    
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
    entry = proc_create("procmodule", 0777, NULL, &my_fops);
    if (!entry)
    {
        return -1;
    }
    else
    {
        printk(KERN_INFO "@procmodule corriendo\n");
    }
    return 0;
}

static void __exit test_exit(void)
{
    remove_proc_entry("procmodule", NULL);
    printk(KERN_INFO "@procmodule finalizado\n");
}

module_init(test_init);
module_exit(test_exit);