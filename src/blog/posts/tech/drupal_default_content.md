---
layout: post.njk
title: Drupal module default_content
date: 2025-12-05
description: Drupal notes
tags: ["tech", "rss", "notes"]
---  

Content von einem Backup in ein Live-System zu übertragen sollte mit Drupal einfach sein. In der Praxis aber doch ein Aufwand der nicht zu unterschätzen ist.

## Backup & Local dev environment
Zuerst geht es darum das Backup ausfindig zu machen und in einer lokalen Entwicklungsumgebung zum Laufen zu bringen. Ein Task der seine Tücken haben kann; mit ddev, ssh und git kommt man aber sein Ziel. Details dazu ggf. mal in einer separaten Note.

## Modul Default content

Wie üblich kann das Drupal von Haus aus nicht, was fragwürdig ist ... oder ich habe schlicht nicht gesehen wie. Mein Recherchen hielten sich auch in Grenzen. Mein Glück versuchte ich mit dem Modul Default content.

Modul installation und export einer Node:
```
ddev composer require drupal/default_content
ddev drush en default_content
ddev drush dcer node 39406 --folder=content

sudo dnf install jpegoptim
```

Natürlich hat das nicht auf Anhieb geklappt.
Man benötigt ein paar Packages und muss den Pfad zu GraphicsMagick in Drupal setzen:
```
sudo dnf install GraphicsMagick
sudo dnf install jpegoptim
which gm
#/usr/bin/gm
```
Den Pfad setzt man in /admin/config/media/image-toolkit

## Import
Für den Import habe ich kein Drush (Drupal shell)-Kommando gesehen. Die Idee scheint zu sein den Content (die .yml-Files) in ein Modul zu verpacken und das Modul zu installieren.
Der export hat ein Sammelsurium von yml-files ausgespuckt; diejenigen die man benötigt pack man in ein neuen Modul in den Ordner content.
Also beispielsweise:

```
web/modules/migration/backup_module/content/node/45f14f57-ea72-4b5b-8510-92ac8e205a38.yml
```
Danach wird das Modul installiert.

## Fazit
Hat funktioniert, war aber umständlich obwohl ich grundsätzlich gut vorbereitet war.
Vermutlich gibt es einfachere Varianten.


## Links & Referenzen  
[download]  




[Default Content]: https://www.drupal.org/project/default_content  
