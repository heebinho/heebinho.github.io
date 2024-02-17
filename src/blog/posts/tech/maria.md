---
layout: post.njk
title: Maria DB
date: 2023-06-10
description: Just some notes ...
tags: ["tech"]
eleventyExcludeFromCollections: true
---  


## Restore Backup


```
$ cd C:\Program Files\MySQL\MySQL Workbench 8.0 CE
$ mysql -u root -p

mysql> create database x;
mysql> use database x;
mysql> source dump.sql;

```
