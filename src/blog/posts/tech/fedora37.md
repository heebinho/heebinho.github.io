---
layout: post.njk
title: Fedora 37
date: 2022-12-12
description: Fedora 37 on Windows with WSL and vscode
tags: ["tech"]
---  
# Intro   
[Fedora Magazine](https://fedoramagazine.org/wsl-fedora-33/)  
[https://github.com/wslutilities/wslu](https://github.com/wslutilities/wslu)  
[wslutilities/wslu](https://copr.fedorainfracloud.org/coprs/wslutilities/wslu/)
[Brew](https://fedoramagazine.org/using-homebrew-package-manager-on-fedora-linux/)




```
https://github.com/fedora-cloud/docker-brew-fedora/tree/37/x86_64


wsl --import fedora37 c:\distros\fedora37 C:\Users\renato\Downloads\fedora-37-x86_64.tar


wsl -d fedora37
wsl -l -v

Get-ItemProperty Registry::HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Lxss\*\ DistributionName | Where-Object -Property DistributionName -eq fedora37  | Set-ItemProperty -Name DefaultUid -Value 1000
```



```bash

[heebinho@thinktank ~]$ sudo dnf copr enable wslutilities/wslu
[sudo] password for heebinho:
Enabling a Copr repository. Please note that this repository is not part
of the main distribution, and quality may vary.

The Fedora Project does not exercise any power over the contents of
this repository beyond the rules outlined in the Copr FAQ at
<https://docs.pagure.org/copr.copr/user_documentation.html#what-i-can-build-in-copr>,
and packages are not held to any quality or security level.

Please do not file bug reports about these packages in Fedora
Bugzilla. In case of problems, contact the owner of this repository.

Do you really want to enable copr.fedorainfracloud.org/wslutilities/wslu? [y/N]: y
Repository successfully enabled.

```


sudo dnf install git  
sudo dnf install nano vim 
sudo dnf groupinstall "Development Tools"  

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

