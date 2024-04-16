---
layout: post.njk
title: Composer 🎺
date: 2024-02-26
description: PHP Package Manager
tags: ["tech", "notes"]
eleventyExcludeFromCollections: false
---  

## Installation

[getcomposer.org](https://getcomposer.org/doc/00-intro.md#installation-linux-unix-macos)


## Installation Windows
[Windows Installer](https://getcomposer.org/download/)

```
> $Env:Path
> php -version

C:\php\php-8.2.16;
C:\Users\renato\AppData\Roaming\Composer\vendor\bin;
```


## Usage  
```
> composer -V
> composer install
> composer update
> composer update monolog/monolog
> composer show
> composer show --platform

> composer dump-autoload

$loader = require __DIR__ . '/vendor/autoload.php';
$loader->addPsr4('Acme\\Test\\', __DIR__);

```

Drupal modules:
```
$ composer require 'drupal/commerce_webform_order:^3.0@beta' --ignore-platform-req=php+
$ drush en commerce_webform_order

[success] Successfully enabled: commerce_webform_order
```



## PHPStorm  


<img class="" src="/img/phpstorm-composer-settings.png"/>




## Links & Notes  
[Basic usage]  
[Composer doc]  
[Packagist]  


[Basic usage]: https://getcomposer.org/doc/01-basic-usage.md  
[Composer doc]: https://getcomposer.org/doc/  
[Packagist]: https://packagist.org/