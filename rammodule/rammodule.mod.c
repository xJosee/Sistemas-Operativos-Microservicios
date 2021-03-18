#include <linux/build-salt.h>
#include <linux/module.h>
#include <linux/vermagic.h>
#include <linux/compiler.h>

BUILD_SALT;

MODULE_INFO(vermagic, VERMAGIC_STRING);
MODULE_INFO(name, KBUILD_MODNAME);

__visible struct module __this_module
__section(.gnu.linkonce.this_module) = {
	.name = KBUILD_MODNAME,
	.init = init_module,
#ifdef CONFIG_MODULE_UNLOAD
	.exit = cleanup_module,
#endif
	.arch = MODULE_ARCH_INIT,
};

#ifdef CONFIG_RETPOLINE
MODULE_INFO(retpoline, "Y");
#endif

static const struct modversion_info ____versions[]
__used __section(__versions) = {
	{ 0xd84fc648, "module_layout" },
	{ 0x7809e5b5, "seq_read" },
	{ 0x7e2a4b6e, "remove_proc_entry" },
	{ 0xc5850110, "printk" },
	{ 0xac906cdf, "proc_create" },
	{ 0x457a169b, "seq_printf" },
	{ 0x40c7247c, "si_meminfo" },
	{ 0x996cf41f, "single_open" },
	{ 0xbdfb6dbb, "__fentry__" },
};

MODULE_INFO(depends, "");


MODULE_INFO(srcversion, "B3B00AA813EBA12244A4B2A");
