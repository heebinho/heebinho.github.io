---
layout: post.njk
title: Drush
date: 2022-12-12
description: Drupal shell & PHP CLI
tags: ["tech"]
eleventyExcludeFromCollections: false
---  

## SSH

```
ssh user@domain.com -i .ssh/id_rsa
```


## Drush

```
$ drush status
```

## PHP CLI

```
$ drush php:cli

>$storage = \Drupal::entityTypeManager()->getStorage('commerce_payment');

>$payment = $storage->create([
    'type' => 'payment_default',
    'payment_gateway' => 'wallee_master_visa_domain_com',
    'order_id' => 33333,
    'remote_id' => '183333333',
 ]);

>$payment->set('state', 'completed');

>$payment->set('remote_state', 'completed');

>$payment->set('amount', new \Drupal\commerce_price\Price('77.77', 'CHF'));

> $payment->save();
= 1

```


