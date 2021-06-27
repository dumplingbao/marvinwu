---

Date: 2021-05-05

Topic:
-  GitLab Ci
-  Docker
Ref:


---

Thanks to this [Stack Overflow](https://stackoverflow.com/questions/62473932/atleast-one-invalid-signature-was-encountered), turn out it is the gitlab runner instance run out of space.

```
# df
Filesystem     1K-blocks     Used Available Use% Mounted on
udev             3961852        0   3961852   0% /dev
tmpfs             795868     1360    794508   1% /run
/dev/sda1       78620712 74262124   1115008  99% /
tmpfs            3979332        0   3979332   0% /dev/shm
tmpfs               5120        0      5120   0% /run/lock
tmpfs            3979332        0   3979332   0% /sys/fs/cgroup
/dev/sda15         61487     2559     58929   5% /boot/efi


```

a simple docker prune solve the problem

```
docker image prune

```



