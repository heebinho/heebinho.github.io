---
layout: post.njk
title: nvm
date: 2024-04-22
description: node version manager
tags: ["tech", "notes"]
---  
## Installation   


```
brew install nvm 
mkdir ~/.nvm  
```

Add the following to your desired shell configuration file.  
E.g. to ~/.bashrc (sourced in interactive non login shells)

```

  export NVM_DIR="$HOME/.nvm"
  [ -s "/home/linuxbrew/.linuxbrew/opt/nvm/nvm.sh" ] && \. "/home/linuxbrew/.linuxbrew/opt/nvm/nvm.sh"  # This loads nvm
  [ -s "/home/linuxbrew/.linuxbrew/opt/nvm/etc/bash_completion.d/nvm" ] && \. "/home/linuxbrew/.linuxbrew/opt/nvm/etc/bash_completion.d/nvm"  # This loads nvm bash_completion
```

Also check configuraton of ide's; configure to start shell interactive (-i)


## Magic

```
nvm ls-remote  
nvm install Gallium  
nvm ls

node -v
npm -v

nvm alias default node
->default -> node (-> v16.19.0)


$ nvm use default


```