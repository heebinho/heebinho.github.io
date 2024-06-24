---
layout: post.njk
title: Drush
date: 2022-12-12
description: Drupal shell
tags: ["tech","notes"]
eleventyExcludeFromCollections: false
---  

## SSH

```
ssh user@domain.com -i .ssh/id_rsa
```


## Drush functional

```
$ drush status
```

### Modules
```
$ drush pm:list
$ drush pm:list --filter "Date"


# uninstall module
$ drush pmu drupalauth4ssp
$ COMPOSER_MEMORY_LIMIT=-1 drush pmu drupalauth4ssp

```


### Routes
```
$ drush core:route | grep mail
$ drush core:route | grep manage/{taxonomy_vocabulary}/overview

return Url::fromRoute('entity.taxonomy_vocabulary.overview_form')
    ->setRouteParameter('taxonomy_vocabulary', $taxonomy)
    ->toString();

$ drush route --path=https://www.ride-mtb.com/de/admin/structure/webform/manage/buchung_huettentour/submission/1445

```

### Config
```
$ drush config:get user.role.api
```

Config edit
```
$ drush config:edit user.role.api
:wq
```

Delete config key
```
$ drush config:delete core.extension module.clever_reach
$ drush config:delete clever_reach.settings
```


### PHP CLI

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

### Delete locked field

```
$ drush php:cli

$field = \Drupal::entityTypeManager()->getStorage('field_config')->load('user.user.field_cleverreach_subscribed');
> $field->delete();
```

### Scripts

```
<?php
/**
 * @file
 * Script to help cleanup the not existing permissions from your roles.
 *
 * @code
 * drush scr clean_permissions.php
 * drush -y cex
 * @endcode
 *
 * @see https://www.drupal.org/node/3193348
 */
$entity_type_manager = \Drupal::entityTypeManager();
$permissions = array_keys(\Drupal::service('user.permissions')->getPermissions());
/** @var \Drupal\user\RoleInterface[] $roles */
$roles = $entity_type_manager->getStorage('user_role')->loadMultiple();
foreach ($roles as $role) {
  $role_permissions = $role->getPermissions();
  $differences = array_diff($role_permissions, $permissions);
  if ($differences) {
    foreach ($differences as $permission) {
      $role->revokePermission($permission);
    }
    $role->save();
  }
}

$ drush scr clean_permissions.php
```



## Links und Referenzen
[Drush commands]  

[Drush commands]: https://www.drush.org/12.x/commands/all/