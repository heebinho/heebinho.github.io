---
layout: layouts/post.njk
title: Fedora 38
date: 2023-05-14
description: Fedora 38 on Windows with WSL and vscode
tags: ["tech"]
---  
# Intro   
Article@Fedora Mag: [Fedora Magazine](https://fedoramagazine.org/wsl-fedora-33/)  
A collection of utilities for WSL: [https://github.com/wslutilities/wslu](https://github.com/wslutilities/wslu)  
Copr: [wslutilities/wslu](https://copr.fedorainfracloud.org/coprs/wslutilities/wslu/)  
Brew: [Brew](https://fedoramagazine.org/using-homebrew-package-manager-on-fedora-linux/)


## Get Fedora

[Fedora 38](https://github.com/fedora-cloud/docker-brew-fedora/tree/38/x86_64)

## Run Fedora
* Extract
* Imports the specified tar file as a new distribution.
* Launch Fedora’s wsl instance as the root user.


```
cd c:\distros
mkdir fedora38
."C:\Program Files\7-Zip\7z.exe" e fedora-38-x86_64.tar.xz
wsl --import fedora38 c:\distros\fedora38 .\fedora-38-x86_64.tar
rm .\fedora-38-x86_64.tar*

wsl -d fedora38
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
Get-ItemProperty Registry::HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Lxss\*\ DistributionName | Where-Object -Property DistributionName -eq fedora38  | Set-ItemProperty -Name DefaultUid -Value 1000
```
Copy ubuntu profile and adjust parameters in windows terminal

## Windows Integration

* Add copr Repo (copr -> community projects)

```bash
$ sudo dnf copr enable wslutilities/wslu
$ sudo dnf install wslu
```


## Setup Fedora further

```bash
$ sudo dnf install git nano vim 
$ sudo dnf groupinstall "Development Tools"  

```


/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"  

echo '# Set PATH, MANPATH, etc., for Homebrew.' >> /home/heebinho/.bash_profile  
echo 'eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"' >> /home/heebinho/.bash_profile  
eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"  

brew install gcc  

brew search node  
brew info node@18  
brew list  
brew uninstall <formula>  
brew upgrade <formula>  
brew update  


brew install nvm 
mkdir ~/.nvm  

Add the following to /home/heebinho/.bash_profile or your desired shell configuration file:  
```

  export NVM_DIR="$HOME/.nvm"
  [ -s "/home/linuxbrew/.linuxbrew/opt/nvm/nvm.sh" ] && \. "/home/linuxbrew/.linuxbrew/opt/nvm/nvm.sh"  # This loads nvm
  [ -s "/home/linuxbrew/.linuxbrew/opt/nvm/etc/bash_completion.d/nvm" ] && \. "/home/linuxbrew/.linuxbrew/opt/nvm/etc/bash_completion.d/nvm"  # This loads nvm bash_completion
```

source .bash_profile  
nvm ls-remote  
nvm install Gallium  
nvm ls  
```
->     v16.19.0
default -> Gallium (-> N/A)
iojs -> N/A (default)
unstable -> N/A (default)
node -> stable (-> v16.19.0) (default)
stable -> 16.19 (-> v16.19.0) (default)
lts/* -> lts/hydrogen (-> N/A)
lts/argon -> v4.9.1 (-> N/A)
lts/boron -> v6.17.1 (-> N/A)
lts/carbon -> v8.17.0 (-> N/A)
lts/dubnium -> v10.24.1 (-> N/A)
lts/erbium -> v12.22.12 (-> N/A)
lts/fermium -> v14.21.2 (-> N/A)
lts/gallium -> v16.19.0
lts/hydrogen -> v18.12.1 (-> N/A)
```


nvm alias default node
->default -> node (-> v16.19.0)


ssh-keygen -t rsa -b 4096 -C heeb@fedora37


/home/linuxbrew/.linuxbrew 
~/.linuxbrew)

