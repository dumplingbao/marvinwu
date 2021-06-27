---

Date: 2021-05-06

Topic:
-  Programming
-  Npm
Ref:


---

#LERNA




#### The flows
* git commit and push

```
gcam
lerna version
ggpush

```

### Questions
* what's the proper way for mono repo how to share common libraries?


* what's yarn work space and what's the beneift of using it with learna?

* when package reference each other, when publish and bump version, will they still use the latest?

	![[Pasted image 20210508095427.png]]
	
	
	```
	lerna version
	
	```
* hwo to publish automatically without promopt?
	add --yes
	```
	lerna version patch --yes
	lerna publish from-git --yes
	```
* what does lerna version do ?

	* tag git history
	* incre sub package version
	* update all links to the sub package to latest version

* what does lerna publish do ?


	it does what lerna version does, plus
	* publish to npm

* whey need to seperate lerna version and publish ?

> Versioning is separated from publishing because I don’t execute the two commands in the same location. For example, ==I can run lerna version manually, when I feel confident that my package deserves a new release==, and automate lerna publish remotely on a CI/CD platform, when all the checks and tests successfully pass and once a new version has been detected.


* how to make lerna publish ignore certain folder?

	in the package.json
	```json
	"private": true
	```

* how to change the lerna version commit messge ?

```
{
  "packages": [
    "packages/*"
  ],
  "version": "0.0.4",
  "command": {
    "version": {
      "message": "chore(release): publish"
    }
  }
}

```

* lerna publish, where does it publish to ?

lerna publish means publish to git repo, it's main job is handle the git hash -> package versioning

* what's the function of yarn workspace ?

* How to init a new repo using lerana

```sh 

lerna init

## independnt versionig

lerna init --independent 
```

* how to init a new sub package?

```
lerna create @lerna-test/title

```

* how to use other pacakge in a sub package?

```sh
pwd /Users/marvinwu/staging/codes/rankequity/bits-test/lerna-t1/packages/forms

lerna add @pixelondesign/button


```


