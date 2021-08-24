---

Date: 2021-07-26

Topic:
-  til
-  Git Scaping
Ref:
-

---

* standard nodejs action

```yml
name: CI
on: [push]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup npmrc
        run: echo "//registry.npmjs.org/:_authToken=${{secrets.NPM_AUTH_TOKEN}}" > .npmrc
      - name: Install Dependencies
        run: npm ci
      - name: test runs-on
        run: npm run scape


```

* action to commit to git

```
name: Scrape latest data

on:
  push:
  workflow_dispatch:
  schedule:
    - cron:  '6,26,46 * * * *'

jobs:
  scheduled:
    runs-on: ubuntu-latest
    steps:
    - name: Check out this repo
      uses: actions/checkout@v2
    - name: Fetch latest data
      run: ./test.sh || true
    - name: Commit and push if it changed
      run: |-
        git config user.name "Automated"
        git config user.email "actions@users.noreply.github.com"
        git add -A
        timestamp=$(date -u)
        git commit -m "Latest data: ${timestamp}" || exit 0
        git push


```



