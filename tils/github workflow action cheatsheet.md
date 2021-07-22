---

Date: 2021-06-10

Topic:
-  CI
-  Github

Ref:


---

  * How to test github action?

* how to make workflow trigger on success completion of another workflow?

	ref: [Workflow_run 'success' type reference - Code to Cloud / GitHub Actions - GitHub Support Community](https://github.community/t/workflow-run-success-type-reference/133194/4)
	
	
	```yml
	name: deploy
	on:
	  workflow_dispatch:  
	  workflow_run:
		workflows: ["process"]
		types:
		  - completed    
	jobs:
	  build:
		if: ${{ github.event.workflow_run.conclusion == 'success' }}
		runs-on: ubuntu-latest
	
	```
* how to run github workflow locally?

https://mauricius.dev/run-and-debug-github-actions-locally/
interesting , comback

* how to specifiy env variable in github workflow"?

Ref: [Encrypted secrets - GitHub Docs](https://docs.github.com/en/actions/reference/encrypted-secrets)
```
name: test
on: 
   push:
   workflow_dispatch:
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Install Dependencies
        run: npm ci
      - name: run test
        run: npm test
        env:
          CODA_API_TOKEN: ${{ secrets.CODA_API_TOKEN }}

```


