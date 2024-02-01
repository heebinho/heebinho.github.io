---
layout: layouts/post.njk
title: Fedora 39
date: 2024-01-25
description: Fedora 39 on Windows with WSL
tags: ["tech","rss"]
---  
# Intro   
Article@Fedora Mag: [Fedora Magazine](https://fedoramagazine.org/wsl-fedora-33/)  
A collection of utilities for WSL: [https://github.com/wslutilities/wslu](https://github.com/wslutilities/wslu)  
Copr: [wslutilities/wslu](https://copr.fedorainfracloud.org/coprs/wslutilities/wslu/)  
Brew: [Brew](https://fedoramagazine.org/using-homebrew-package-manager-on-fedora-linux/)


## Get Fedora

[Fedora 39](https://github.com/fedora-cloud/docker-brew-fedora/tree/39/x86_64)

## Run Fedora
* Extract
* Imports the specified tar file as a new distribution.
* Launch Fedora’s wsl instance as the root user.


```
cd c:\distros
mkdir fedora39
."C:\Program Files\7-Zip\7z.exe" e fedora-39-x86_64.tar.xz
wsl --import fedora39 c:\distros\fedora39 .\fedora-39-x86_64.tar
rm .\fedora-39-x86_64.tar*

wsl -d fedora39
```

## Setup Fedora basics

* Update
* Install packages & dependencies
* Add user

```
dnf update
dnf install wget curl sudo ncurses dnf-plugins-core dnf-utils passwd findutils
useradd -G wheel heebinho
passwd heebinho
```

## Windows Registry & Terminal profile

* Set default uid with ps (id -u)
* Terminal profile

```
wsl -l -v
Get-ItemProperty Registry::HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Lxss\*\ DistributionName | Where-Object -Property DistributionName -eq fedora39  | Set-ItemProperty -Name DefaultUid -Value 1000
```
Copy ubuntu profile and adjust parameters in windows terminal

## WSL utilities (wslu)
Install [wslu](https://wslutiliti.es/wslu/)

The utilities are available from a copr repository (copr -> community project).  
Either: 
* wslutilities/wslu
* wslutilities/wslu-canary

The canary repo worked this time on the contrary to the "stable" release.
By the way the origin of the word canary according to 
[TechTarget](https://www.techtarget.com/whatis/definition/canary-canary-testing)
> The word canary describes the rollout of software code to a subset of real end users. The term originated from coal mining and the phrase "canary in the coal mine." Canary birds have a lower tolerance to toxic gases than humans, so they were used to alert miners when these gases reached dangerous levels inside the mine.  



```bash
$ sudo dnf copr enable wslutilities/wslu
$ sudo dnf install wslu

$ sudo dnf copr enable wslutilities/wslu-canary
$ sudo dnf install wslu

$ wslsys

```
[wslu](https://wslutiliti.es/)  
[wslu blog](https://blog.wslutiliti.es/)  
[wslu canary announcement](https://blog.wslutiliti.es/2022/03/21/)



## Setup Fedora further

```bash
$ sudo dnf install git nano vim 
$ sudo dnf groupinstall "Development Tools"  

```

