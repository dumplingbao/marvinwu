---




Date: 2021-04-08
Topic:
-  til
-  devops
Ref:
---




Cannot write: No space left on device 
df

/dev/xvda1      7.7G  7.6G  165M  98% /

It is on a simple ssh EC2 server with literally nothing installed.

after some googling, I found what's the taking up the space - Linux Headers

HOW TO RESOLVE IT
sudo apt-get clean # this is to clean up some room, to execute the next command

sudo apt autoremove
HOW TO VERIFY
ubuntu@ip-172-31-24-72:~$ df -h
Filesystem      Size  Used Avail Use% Mounted on
udev            488M     0  488M   0% /dev
tmpfs           100M   13M   88M  13% /run
/dev/xvda1      7.7G  1.7G  6.0G  22% /
tmpfs           496M     0  496M   0% /dev/shm
tmpfs           5.0M     0  5.0M   0% /run/lock
tmpfs           496M     0  496M   0% /sys/fs/cgroup
tmpfs           100M     0  100M   0% /run/user/1001
tmpfs           100M     0  100M   0% /run/user/1000




