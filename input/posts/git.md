Title: Git
Published: 9/11/2019
Tags: Git
Lead: Git cheat sheet
---

## Resetting a fork

```bash
$ cd <your local repo>
git remote add upstream /url/to/original/repo.git
git fetch upstream
git checkout master
git reset --hard upstream/master  
git push origin master --force
```

## Embed gist

add .pibb to a gist to get the html version: https://gist.github.com/heebinho/a1d5655901902db3c5399ecf38c9681c.pibb

> \<?# Gist a1d5655901902db3c5399ecf38c9681c /?>

<?# Gist a1d5655901902db3c5399ecf38c9681c /?>