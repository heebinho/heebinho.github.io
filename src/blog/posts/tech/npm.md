---
layout: post.njk
title: npm
date: 2024-08-25
description: node package manager
tags: ["tech", "notes"]
---  

## Installation   

Windows see [node.js]

Linux see [nvm](../nvm)

```ps
node -v # v20.17.0
npm -v # 10.8.2
```

## Install

```
npm install @11ty/eleventy@beta
npm install @11ty/eleventy-upgrade-help@3
```

## The misterious update   

1. Identify out of date packages with npm outdated
2. Update the versions in your package.json
3. Run npm update to install the latest versions of each package

Help witch npm-check-updates

```
npm outdated

npm update
npm update --save

npm i npm-check-updates -g
ncu
ncu -u
npm update

```


## Links & Referenzen  
[node.js]  





[node.js]: https://nodejs.org/en/download/package-manager  


