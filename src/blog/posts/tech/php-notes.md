---
layout: layouts/post.njk
title: Php on Fedora wsl xdebug integration
date: 2022-12-12
description: Lets try some php 8.x
---  


sudo dnf install php-cli  

```
========================================================================================================================
 Package                      Architecture             Version                          Repository                 Size
========================================================================================================================
Installing:
 php-cli                      x86_64                   8.1.13-1.fc37                    updates                   5.3 M
Installing dependencies:
 php-common                   x86_64                   8.1.13-1.fc37                    updates                   843 k

Transaction Summary
========================================================================================================================
Install  2 Packages
```

sudo dnf install phpunit composer  

sudo dnf install php-xdebug

vscode install PHP Debug (Remote extension)

mkdir
touch index.php
phpinfo();

start local development server
sudo php --server localhost:8000 --docroot  .  

(used vscode to find rows)  
sudo vim /etc/php.d/15-debug.ini  
xdebug.mode = debug  
xdebug.start_with_request = yes  

