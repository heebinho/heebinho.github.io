---
layout: post.njk
title: WSL
date: 2024-02-26
description: Windows Subsystem for Linux
tags: ["tech", "notes"]
eleventyExcludeFromCollections: false
---  


## Installation
[Install](https://learn.microsoft.com/en-us/windows/wsl/install)


## Usage
```
> wsl --list --online
> wsl --install -d Ubuntu-22.04
> wsl -d Ubuntu-22.04

```

## Windows mount
```
/mnt/c/Users/[Username]
```

## Troubleshoot
Error code: Wsl/InstallDistro/0x80070422  
Fix Microsoft Account Sign-in Assistant Service ([Source](https://revertservice.com/8/wlidsvc/))

```
⚡> sc config wlidsvc start= demand
```

## Links & Notes  
[Basic usage]  


[Basic usage]: https://getcomposer.org/doc/01-basic-usage.md  
