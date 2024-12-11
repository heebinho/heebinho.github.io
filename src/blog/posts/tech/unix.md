---
layout: post.njk
title: GNU / Linux / Unix
date: 2024-02-12
description: Cheat sheet
tags: ["tech", "note"]
eleventyExcludeFromCollections: false
---  

## Environment

```
whoami 
cat /etc/os-release
uname --help
```

### Group

```
getent group #get-entries
cat /etc/group
groups $USER
```


### Profile

> the original rc affix and extension both meant **run commands**.   

[source](https://www.baeldung.com/linux/rc-files)

evolved into:
- run control
- run configuration
- runtime configuration


```
# In intelliJ/phpstorm change shell path to interactive
/bin/bash -i  # interactive shell (-i)
```


 

| file  | about  |
|---|---|
| /etc/profile  | system-wide startup file for bourne compatible shells  |
| ~./profile  |   |
| ~./bash_profile  |   |
| ~./bash_login  |   |

-  -> 
personal init files:


- .bashrc
- .profile

Mnemonic: A Pro-File is used sparingly to modify your environment and start your ignition switch, Bashrc is a splash some people spray all over your dash. 



## System maintenance & Package manager

```
sudo apt update && sudo apt full-upgrade
$ sudo do-release-upgrade

```

## Shell
```
man bash
shopt login_shell #login_shell off
```
[Shell optional behavior](https://www.gnu.org/software/bash/manual/html_node/The-Shopt-Builtin.html)


## scp

```
scp .\Downloads\JetBrainsGateway-2024.2.3.tar.gz heebinho@powercube:/home/heebinho/JetBrainsGateway.tar.gz


```

## Links & Referenzen  
[gnu Bash manual]  
 




[gnu Bash manual]: https://www.gnu.org/software/bash/manual/html_node/  
  







