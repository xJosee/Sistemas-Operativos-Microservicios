obj-m += rammodule.o
all:
	make -C /lib/modules/$(shell uname -r)/build M=$(shell pwd) modules
clean:
	make -C /lib/modules/$(shell uname -r)/build M=$(shell pwd) clean
test:
	sudo insmod rammodule.ko
remove:
	sudo rmmod rammodule.ko