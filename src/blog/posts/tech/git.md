---
layout: post.njk
title: Git
date: 2019-11-09
description: Git cheat sheet
tags: ["tech", "note"]
eleventyExcludeFromCollections: false
---  

## Commit

### Amend
```
git commit --amend
git commit --amend -m "New commit message"
```


## Resetting a fork


```bash
$ cd <your local repo>
git remote add upstream /url/to/original/repo.git
git fetch upstream
git checkout master
git reset --hard upstream/master  
git push origin master --force
```

## Undo a commit -no trace
```bash
git reset sha1
git push -f <remote-name> <branch-name>
```


## Embed gist

add .pibb to a gist to get the html version: https://gist.github.com/heebinho/a1d5655901902db3c5399ecf38c9681c.pibb

> \<?# Gist a1d5655901902db3c5399ecf38c9681c /?>

<?# Gist a1d5655901902db3c5399ecf38c9681c /?>


## Configuring a remote for a fork

```bash
$ git remote -v
>origin  https://github.com/heebinho/functional-csharp-code.git (fetch)
>origin  https://github.com/heebinho/functional-csharp-code.git (push)
$ git remote add upstream https://github.com/la-yumba/functional-csharp-code.git
```

## Syncing a fork

```bash
$ git fetch upstream
$ git checkout master
$ git merge upstream/master
```

## Fork mismatched to upstream master

```
git branch ssp
git reset --hard HEAD~2 # Go back 2 commits
git checkout ssp
git push --set-upstream origin ssp 
git checkout master
git remote add upstream https://github.com/drupalauth/simplesamlphp-module-drupalauth.git
git fetch upstream
git checkout main

git merge upstream/main
git branch -d master

```

## Merge to Rebase

```
git reset --hard 71cb64209353c1e3ce7a4ed72c14d111707725cd
git branch test
git rebase upstream/main
git cherry-pick a82f65a19c8cd46b5f9df685eb0d65c99f15587e --no-commit
git commit -m "x"
git push --set-upstream origin ssp
```

## Branch

```
git branch --help
git branch -d test #delete branch
git branch -m name new_name #rename branch

```
## Tags

```
git tag --help
git fetch --all --tags
git checkout tags/v2.2.1 -b live

```

## Stash

```
git stash --help
git stash save
git stash pop

```

## Merge

```
git merge --help


```

## Clean
```
git clean -n -d
git clean -f
```
[git-clean]  



## Credential store
```
git config --global credential.helper store
git pull
 git config --global credential.helper forget
```



## Git Layers
* Persistant Map
* Content Tracker
* Revision Control System
* Distribution

### Git as a "Persistant Map"
Key;Value
SHA1(20Bytes);Bytes


```bash
$ echo "Hello World" | git hash-object --stdin
//persist (w->write)
$ echo "Hello World" | git hash-object --stdin -w
$ ls -a
$ cd .git/objects/f5
//type of an object -> -t
$ git cat-file f5b49699a4524b0a56f1b19a648725971eeb9e6b -t
//pretty print an object -> -p
$ git cat-file f5b49699a4524b0a56f1b19a648725971eeb9e6b -p
$ git count-objects
```


## Git's straightforward object model
* Blob
* Tree
* Commit
* Annotated Tag

```bash
$ git tag -a V1 -m "Version 1"
$ git tag
$ git cat-file V1 -p
```


### As a revision control system
```bash
$ git log
$ git branch
$ git .git/refs/heads
$ cat master
-> 77bd4774aea4f36a962847e5d789a3702f6b4f8b
$ git cat-file 77bd4774a -t
-> commit
$ git cat-file 77bd4774a -p
$ git branch 
$ git branch oki
$ cat .git/HEAD
-> ref: refs/heads/master
$ vim recipes/apple-pie.txt
$ git commit -m "apple pie Ingredients"
$ git checkout oki

//Merge
$ git merge oki
-->
On branch master
You have unmerged paths.
  (fix conflicts and run "git commit")
  (use "git merge --abort" to abort the merge)

Unmerged paths:
  (use "git add <file>..." to mark resolution)

        both modified:   recipes/applie-pie.txt

no changes added to commit (use "git add" and/or "git commit -a")
```
So a branch is just a reference to a commit.  
And HEAD is just a reference to a branch. (a pointer to a pointer)  
A checkout moves the HEAD and updates the working area



## Links & Referenzen  
[git-clean]  
 




[git-clean]: https://stackoverflow.com/questions/61212/how-do-i-remove-local-untracked-files-from-the-current-git-working-tree  
