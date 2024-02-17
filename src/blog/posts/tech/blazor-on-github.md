---
layout: post.njk
title: Blazor hosted on github-pages
date: 2020-04-21
description: Blazor Webassembly
tags: ["tech"]
---

### Intro
While deploying my first "Blazor webassembly" app to "GitHub pages" I ran into some minor troubles.
The following notes may be helpful for someone else.

### Blazor webassembly
Blazor is a web framework using C#, Razor and HTML that runs in the browser with WebAssembly.
You can find more information on [https://blazor.net][1]

### GitHub Pages
GitHub Pages allows you to publish your website for free, hosted directly from your GitHub repository. Just edit, push, and your changes are live.
You can find more information on [https://pages.github.com][2]

### Bypassing Jekyll
GitHub Pages is using the static site generator [Jekyll][3] to publish your site.
When publishing your Blazor app you'll end up with a folder named _framework.
The problem is that Jekyll won't process that _framework folder because it starts with an underscore:

> Every file or directory beginning with the following characters: ., _ , # or ~ in the source directory will not be included in the destination folder  

To circumvent that problem you can add a file with the name .nojekyll to the root directory of your repo. ([Bypass Jekyll][4])




### Hosting on Subdirecotry and SPA Routing
I already use a static site generator and publish to the root directory of the master branch. So my Blazor experiment has to go into a subdirectory. To get your app up and running you'll have to set the base as follows:

```html
<base href="/subdirectory/" />
```
If you're lucky you can reach your Blazor app now. But you can't reach for example domain.com/subdirectory/counter because GitHub Pages doesn't natively support single page apps. You can use a straightforward solution from [rafrex][5] to overcome this routing issue. Just add a custom [404.html][6] to the root directory of your master branch.
Dont't forget to adjust the segment count in the script:

```javascript
var segmentCount = 1;

var l = window.location;
l.replace(
  l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
  l.pathname.split('/').slice(0, 1 + segmentCount).join('/') + '/?p=/' +
  l.pathname.slice(1).split('/').slice(segmentCount).join('/').replace(/&/g, '~and~') +
  (l.search ? '&q=' + l.search.slice(1).replace(/&/g, '~and~') : '') +
  l.hash
);
```
One last thing to do - add the following script to your index.html:

```javascript
<script type="text/javascript">
  // Single Page Apps for GitHub Pages
  // https://github.com/rafrex/spa-github-pages
  // Copyright (c) 2016 Rafael Pedicini, licensed under the MIT License
  // ----------------------------------------------------------------------
  (function(l) {
    if (l.search) {
      var q = {};
      l.search.slice(1).split('&').forEach(function(v) {
        var a = v.split('=');
        q[a[0]] = a.slice(1).join('=').replace(/~and~/g, '&');
      });
      if (q.p !== undefined) {
        window.history.replaceState(null, null,
          l.pathname.slice(0, -1) + (q.p || '') +
          (q.q ? ('?' + q.q) : '') +
          l.hash
        );
      }
    }
  }(window.location))
</script>
```


### Failing integrity checks
I use Azure DevOps pipelines to publish my [Wyam][7] site. When I integrated my Blazor app I ended up with failing integrity checks when trying to access it. Probably because I've used a Windows image where the git config option core.autocrlf option was set to true. You can find possible solutions and background informations here: [https://github.com/dotnet/aspnetcore/issues/19796][8]



  [1]: https://blazor.net/
  [2]: https://pages.github.com/
  [3]: https://jekyllrb.com/
  [4]: https://github.blog/2009-12-29-bypassing-jekyll-on-github-pages/
  [5]: https://github.com/rafrex/spa-github-pages#readme
  [6]: https://github.com/rafrex/spa-github-pages/blob/gh-pages/404.html
  [7]: https://wyam.io
  [8]: https://github.com/dotnet/aspnetcore/issues/19796
