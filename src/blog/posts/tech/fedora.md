---
layout: post.njk
title: Fedora
date: 2024-10-13
description: Fedora notes
tags: ["tech", "rss", "notes"]
---  


## Get Fedora
[download]

- Use Fedora Media Writer, to write an iso to a usb-stick
- Boot Live System, Install

## Keygen

```
ssh-keygen -t rsa -b 4096
```


## Problem: System suspends after 15 minutes
Allthough connected via ssh the system suspends after 15 minutes

```
Broadcast message from gdm@powercube on tty1 (Sun 2024-10-13 12:45:58 CEST):

The system will suspend now!
```

Fix
```
sudo -u gdm dbus-run-session gsettings list-recursively org.gnome.settings-daemon.plugins.power | grep sleep # Show relevant settings

sudo -u gdm dbus-run-session gsettings set org.gnome.settings-daemon.plugins.power sleep-inactive-ac-timeout 1800 # In seconds | O disabled

```
[suspend-fix]  




## Links & Referenzen  
[download]  
[suspend-fix]  




[download]: https://fedoraproject.org/en/workstation/download  
[suspend-fix]:  https://discussion.fedoraproject.org/t/gnome-suspends-after-15-minutes-of-user-inactivity-even-on-ac-power/79801  