---
layout: layouts/post.njk
title: Samba
date: 2023-05-17
description: Samba notes
---

Samba

[Samba Quick doc](https://docs.fedoraproject.org/en-US/quick-docs/samba/)

## Install & dir prep

```
$ sudo dnf install samba
$ sudo systemctl enable smb --now
$ firewall-cmd --get-active-zones
$ sudo firewall-cmd --permanent --zone=FedoraWorkstation --add-service=samba
$ sudo firewall-cmd --reload

# Create samba user
$ sudo smbpasswd -a heebinho

# SELinux!
$ sudo setsebool -P samba_domain_controller on
$ sudo setsebool -P samba_enable_home_dirs on

# Directories
$ sudo semanage fcontext --add --type "samba_share_t" "/mnt/backup(/.*)?"
$ sudo restorecon -R /mnt/backup

# Mount disk on startup

```




## smb.conf
/etc/samba/smb.conf.example  
/etc/samba/smb.conf

```
[global]
  follow symlinks = yes
  wide links = yes
  unix extensions = no

# Validate
$ testparm smb.conf
```


## Troubleshoot

```
$ sudo systemctl restart smb

$ smbstatus
-> Protocol: SMB3_11

$ sudo tail -f /var/log/samba/log.smbd

$ ls -dZ /mnt/backup
-> system_u:object_r:unlabeled_t:s0 /mnt/backup

$ sudo semanage fcontext --add --type "samba_share_t" "/mnt/backup(/.*)?"
$ sudo restorecon -R /mnt/backup
-> system_u:object_r:samba_share_t:s0 /mnt/backup
```