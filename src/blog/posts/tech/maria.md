---
layout: post.njk
title: Maria DB
date: 2023-06-10
description: Just some notes ...
tags: ["tech"]
eleventyExcludeFromCollections: false
---  


## Restore Backup


```
$ cd C:\Program Files\MySQL\MySQL Workbench 8.0 CE
$ mysql -u root -p

mysql> show databases;
mysql> create database x;
mysql> use x;
mysql> show tables;
mysql> source dump.sql;

```


## Backup
```
mysql -f -v -h account.mysql.db.internal -u dbusername -p


```

## mysqldump

```
$ mysqldump --help
Usage: mysqldump [OPTIONS] database [tables]

-h, --host=name (-h host.mysql.db.internal)
-u, --user=name (-u database_user)
--ignore-table=name (--ignore-table=x.watchdog)
--ignore-table-data=name (--ignore-table-data=x.watchdog)


# drupal example, see mysqldump.readme (drive/db)
# clear cache upfront

mysqldump -h account.mysql.db.internal -u account_name -p --ignore-table-data=db.watchdog --ignore-table-data=db.maillog db > dump.sql

```

## Functional

### Date & Time
```
select *, FROM_UNIXTIME(nfd.created)  from node_field_data nfd where nfd.nid = 40601
```

## Links & Notes  
[mysqldump.guru](https://mysqldump.guru/what-is-mysqldump.html)  