obj-m += procmodule.o
all:
	make -C /lib/modules/$(shell uname -r)/build M=$(shell pwd) modules
clean:
	make -C /lib/modules/$(shell uname -r)/build M=$(shell pwd) clean
test:
	sudo insmod procmodule.ko
remove:
	sudo rmmod procmodule.ko