---
layout: post.njk
title: PHPBrew
date: 2024-02-28
description: Multiple concurrent PHP versions
tags: ["tech", "notes"]
eleventyExcludeFromCollections: false
---  


## Requirements
[Requirements](https://github.com/phpbrew/phpbrew/wiki/Requirement) (Ubuntu 22.04)
```
$ sudo apt-get install \
  build-essential \
  libbz2-dev \
  libreadline-dev \
  libsqlite3-dev \
  libcurl4-gnutls-dev \
  libzip-dev \
  libssl-dev \
  libxml2-dev \
  libxslt-dev \
  php8.1-cli \
  php8.1-bz2 \
  php8.1-xml \
  pkg-config
```

Package requirements (oniguruma) were not met: No package 'oniguruma' found
```
$ sudo apt-get install libonig-dev
$ apt list libonig*
```

Cannot find autoconf. Please check your autoconf installation and the $PHP_AUTOCONF environment variable. Then, rerun this script.
```
$ sudo apt-get install autoconf
```

## Installation

```
$ curl -L -O https://github.com/phpbrew/phpbrew/releases/latest/download/phpbrew.phar
$ chmod +x phpbrew.phar
$ sudo mv phpbrew.phar /usr/local/bin/phpbrew
$ phpbrew -v

  ______ _   _ ____________
  | ___ \ | | || ___ \ ___ \
  | |_/ / |_| || |_/ / |_/ /_ __ _____      __
  |  __/|  _  ||  __/| ___ \ '__/ _ \ \ /\ / /
  | |   | | | || |   | |_/ / | |  __/\ V  V /
  \_|   \_| |_/\_|   \____/|_|  \___| \_/\_/

Brew your latest php!

```

## Setup
Initialize phpbrew config file.
```
$ phpbrew init

Initialization successfully finished!
<=====================================================>
Phpbrew environment is initialized, required directories are created under

    /home/heebinho/.phpbrew

Paste the following line(s) to the end of your ~/.bashrc and start a
new shell, phpbrew should be up and fully functional from there:

    source /home/heebinho/.phpbrew/bashrc

To enable PHP version info in your shell prompt, please set PHPBREW_SET_PROMPT=1
in your `~/.bashrc` before you source `~/.phpbrew/bashrc`

    export PHPBREW_SET_PROMPT=1

To enable .phpbrewrc file searching, please export the following variable:

    export PHPBREW_RC_ENABLE=1


For further instructions, simply run `phpbrew` to see the help message.

Enjoy phpbrew at $HOME!!

<=====================================================>

```

## Usage
```
$ phpbrew update
$ phpbrew known
$ phpbrew known --more
$ phpbrew install 8.3 +default
$ phpbrew install 8.3 +default +debug
$ phpbrew list
$ phpbrew variants
$ phpbrew use php-8.3.3

Switch default:
$ phpbrew switch php-8.3.3
```







## xDebug
```
$ phpbrew --debug ext install xdebug

===> Creating config file 
~/.phpbrew/php/php-8.3.3/var/db/xdebug.ini

===> Enabling extension xdebug
[*] xdebug extension is enabled for SAPI cli.

```




## Files & Paths

The installed phps are located in ~/.phpbrew/php, for example, php 8.3.3 is located at:
```
~/.phpbrew/php/php-8.3.3/bin/php
~/.phpbrew/php/php-8.3.3/etc/php.ini
~/.phpbrew/php/php-8.3.3/var/db/xdebug.ini
```


## Links & Notes  
[phpbrew.github.io]  
[phpbrew repo]    
[pkgs]    

[phpbrew.github.io]: https://phpbrew.github.io/phpbrew/  
[phpbrew repo]: https://github.com/phpbrew/phpbrew  
[pkgs]: https://pkgs.org/