#!/bin/sh

cp docs/img/remote/* img/remote/
cp docs/img/* img/
git status
git add img/
git commit -m "Persist images"
