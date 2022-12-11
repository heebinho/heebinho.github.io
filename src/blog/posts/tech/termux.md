---
layout: layouts/post.njk
title: Termux, a cli at your fingertips
date: 2020-06-19
description: Creating a blog post from your android mobile
---

### Intro
While I was looking for an Android Git client and a Markdown editor I came across the  [Termux](https://termux.com) project.

> Termux is an Android terminal emulator and Linux environment app that works directly with no rooting or setup required.  
 A minimal base system is installed automatically - additional packages are available using the APT package manager.

Sounds amazing. To good to be true?

### Setup
The setup was as easy as promised. Just install the Termux app from the play store and use the integrated package manager to install git and vim. Don't forget to setup your git config appropriately:
```
$ pkg install git
$ pkg install vim
$ git config --global user.name "Renato"
$ git config --global user.email "..."

```

### Usage
Now you can use the cli, git and vim to create and edit your blog posts on the go without your notebook.
* Clone your repo. 
* Create a new Markdown file from a template. 
* Use vim to edit your blog post.
* ...
```bash
$ git clone https://github.com/heebinho/heebinho.github.io.git
$ cp input/posts/template.md input/posts/newblogpost.md
$ vim input/posts/newblogpost.md
$ git add input/posts/newblogpost.md
$ git commit -m "new blog post"
$ git push

```

If you've never used vim before, you should probably run the vimtutor first to get a basic understandig of how to navigate, save and most importantly exit vim:
```bash
$ vimtutor
```

### Conclusion
Amazing app. Probably I won't use it to often, but it's a great tool at your fingertips.

Here you can see Termux in action:

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/ML5adkmaXi4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

