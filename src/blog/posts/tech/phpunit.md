---
layout: post.njk
title: PHPUnit 🟢🔴
date: 2024-02-26
description: Unit testing in PHP
tags: ["tech", "notes"]
eleventyExcludeFromCollections: false
---  

## Installation


```
> composer require --dev phpunit/phpunit ^11
> .\vendor\bin\phpunit --version 
```

Powershell on Windows:
```
> composer require --dev phpunit/phpunit  ^^^^11  

```

## Usage  
```php
<?php declare(strict_types=1);


use PharIo\Manifest\Email;
use PHPUnit\Framework\TestCase;

final class EmailTest extends TestCase {
  public function testCanBeCreatedFromValidEmail(): void {
    $string = 'test@mail.com';
    $email = new Email('test@mail.com');
    $this->assertSame($string, $email->asString());
  }

  public function testCannotBeCreatedFromInvalidEmail(): void {
    $this->expectException(InvalidArgumentException::class);
    new Email('invalid');
  }
}

```


## PHPStorm  

```
$ composer dump-autoload
```

<img class="" src="/img/phpstorm-test_frameworks-settings.png"/>


[Test Frameworks](https://www.jetbrains.com/help/phpstorm/2024.1/php-test-frameworks.html?utm_source=product&utm_medium=link&utm_campaign=PS&utm_content=2024.1#PHP_test_frameworks_PHPUnit)


## Links & Notes  
[Doc]



[Doc]: https://docs.phpunit.de/en/11.0/