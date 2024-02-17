---
layout: layouts/post.njk
title: PHP on Fedora
date: 2024-02-10
description: xDebug setup
tags: ["tech", "note", "rss"]
---  

## PHP Installation
```
$ sudo dnf install php-cli  
$ sudo dnf install phpunit composer  
$ php -i
$ php --help
```

## xDebug Installation
```
$ sudo dnf install php-xdebug
```

## vscode

Connect to WSL using Distro... (see [fedora39](../../fedora39))  
Extension: PHP Debug (Remote extension)


## PHP interactive shell

```
$ php -a
php > $test = "Interactive shell";
php > print($test);
php > phpinfo();
php > exit
```

## PHP Dev Server
```
$ touch index.php
<?php
phpinfo();
?>
$ sudo php --server localhost:8080 --docroot  .

```

## xDebug Configuration

vscode | vim  

```
$ sudo chown heebinho /etc/php.d/15-xdebug.ini
$ code /etc/php.d/15-xdebug.ini

xdebug.mode = debug  
xdebug.start_with_request = yes  

$ sudo chown root /etc/php.d/15-xdebug.ini 
$ sudo vim /etc/php.d/15-debug.ini  

```









## Links
[Fedora PHP]  
[xDebug]  
[xDebug Wizard]

[Fedora PHP]: https://developer.fedoraproject.org/tech/languages/php/php-installation.html  
[xDebug]: https://xdebug.org/docs/step_debug  
[xDebug Wizard]: https://xdebug.org/wizard  