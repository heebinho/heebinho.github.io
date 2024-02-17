---
layout: post.njk
title: Powershell cheatsheet
date: 2023-04-15
description: Powershell notes
---

Terminals are a fast and elegant way to manage your system.
But who can remember all the commands and switches?
These are notes to my future self.

## Install & Upgrade
winget install --id Microsoft.Powershell --source winget  
[doc](https://learn.microsoft.com/en-us/powershell/scripting/install/installing-powershell-on-windows)

## Execute

```
string script = File.ReadAllText(fi.FullName);
using var ps = PowerShell.Create();
ps.AddScript(script).Invoke();
```

## Chrome copy as ps

```
$session = New-Object Microsoft.PowerShell.Commands.WebRequestSession
$session.UserAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36"
$session.Cookies.Add((New-Object System.Net.Cookie("Name", "2023-04-16-08", "/", ".google.ch")))
Invoke-WebRequest -UseBasicParsing -Uri "https://www.google.ch/" `
-WebSession $session `
-Headers @{
"authority"="www.google.ch"
  "method"="GET"
  "path"="/"
  "scheme"="https"
  "accept"="text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7"
  "accept-encoding"="gzip, deflate, br"
  "accept-language"="en-GB,en-US;q=0.9,en;q=0.8,de;q=0.7"
  "cache-control"="no-cache"
  ...
}
```