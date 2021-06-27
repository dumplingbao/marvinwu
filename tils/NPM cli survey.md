---

Status: 
Date: 2021-06-08
Topic:
-  CLI
-  NPM
---

* interesting, could use this [cli - npm](https://www.npmjs.com/package/cli)


general structure

lib - actual source
bin - cli, executable

package.json bin -> bin

***

* sample [rafeca/prettyjson: Package for formatting JSON data in a coloured YAML-style, perfect for CLI output](https://github.com/rafeca/prettyjson)

	```
	"bin": {
    "prettyjson": "./bin/prettyjson"
  	},
	```

	![[Pasted image 20210608132536.png]]
	
* [package.json — mishoo/UglifyJS — GitHub1s](https://github1s.com/mishoo/UglifyJS/blob/HEAD/package.json)	

	cli
	```
	#! /usr/bin/env node
	// -*- js -*-
		```	
		
* [ncp — AvianFlu/ncp — GitHub1s](https://github1s.com/AvianFlu/ncp/blob/HEAD/bin/ncp)

	

