---
layout: post.njk
title: Mautic
date: 2024-04-19
description: Notes
tags: ["tech", "note"]
eleventyExcludeFromCollections: false
---  


## Installation

### System Ubuntu 22.04
```
sudo apt-get install php-zip
sudo apt-get install php-imap
sudo apt-get install php-bcmath
sudo apt-get install php-gd
sudo apt-get install php-curl
```


### imap
```
# to compile php with the imap extensions:
sudo apt-get install libkrb5-dev
sudo apt-get install libpng-dev
sudo apt-get install libc-client-dev
sudo ln -s /usr/lib/libc-client.a /usr/lib/x86_64-linux-gnu/libc-client.a
```

### Compile php
```
tail -F '~/.phpbrew/build/php-8.3.3/build.log'

phpbrew install 8.3 +default +imap +gd +pdo +mysql +debug

phpbrew ext install gd
phpbrew ext install iconv
phpbrew ext install pdo_mysql

```

### Pear
```
Wrote PEAR system config file at: ~/.phpbrew/php/php-8.3.3/etc/pear.conf

# Add to php.in include_path
include_path = ".:~/.phpbrew/php/php-8.3.3/lib/php/pear"
```


### nvm
```
sudo apt-get install npm
brew install node
brew install nvm
# see nvm notes
sudo vim ~/.profile #mod&:wq
source ~/.profile
$ node -v #v18.20
nvm ls-remote
nvm install Hydrogen
```

## Mariadb
```
sudo apt-get install mariadb-server
sudo systemctl stop mariadb.service
sudo systemctl start mariadb.service
sudo mysql
CREATE DATABASE mauticdb;
CREATE USER 'mauticuser'@'localhost' IDENTIFIED BY 'YOURPASS';
GRANT ALL ON mauticdb.* TO 'mauticuser'@'localhost' IDENTIFIED BY 'YOURPASS' WITH GRANT OPTION;
FLUSH PRIVILEGES;
```



## Mautic
```
composer create-project mautic/recommended-project:^5 mautic --no-interaction

composer install
npx update-browserslist-db@latest

```



## Troubleshooting

### Memory limit

```
# Show php.ini files
php --ini

# Change limit in ~/.phpbrew/php/php-8.3.3/etc/cli/php.ini
```

### Php extensions
```
# Check extensions
phpbrew ext

[*] pdo          8.3.3
[*] pdo_mysql    8.3.3
```

### PHP
```
# Show php modules
php -m

# Show include_path
php -a
echo get_include_path();

# Sho ini files
php --ini
```

## Cron

/usr/bin/php /home/sportsp/www/mautic/bin/console mautic:segments:update

/usr/bin/php /home/sportsp/www/mautic/bin/console mautic:campaigns:update

/usr/bin/php /home/sportsp/www/mautic/bin/console mautic:campaigns:trigger

/usr/bin/php /home/sportsp/www/mautic/bin/console mautic:custom-field:create-column

/usr/bin/php /home/sportsp/www/mautic/bin/console mautic:iplookup:download


## Settings

```
www/mautic/config] $ cat local.php | grep debug
'debug' => false,
```



## Links und Referenzen
[phpbrew]  
[compile-php-source-error-utf8_mime2text-new-signature]

[phpbrew]: https://phpbrew.github.io/phpbrew/
[compile-php-source-error-utf8_mime2text-new-signature]: https://ma.ttias.be/compile-php-source-error-utf8_mime2text-new-signature/
[]: https://github.com/phpbrew/phpbrew/issues/1176