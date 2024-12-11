---
layout: post.njk
title: ddev
date: 2022-12-12
description: ddev
tags: ["tech"]
eleventyExcludeFromCollections: true
---  






## Quickstart

https://ddev.readthedocs.io/en/latest/users/quickstart/


´´´
ddev config --project-type=drupal --php-version=8.3 --docroot=web

ddev start

#Network ddev_default created


ddev launch

´´´


## Docker
´´´
docker ps
docker exec -it ddev-drupal-web sh #

docker context ls
docker context use desktop-linux
docker context use default


´´´