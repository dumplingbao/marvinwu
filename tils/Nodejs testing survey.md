---

---

How does testing and mock data should be done in nodejs ?

* [node-sqlite3/affected.test.js at master · mapbox/node-sqlite3](https://github.com/mapbox/node-sqlite3/blob/master/test/affected.test.js)

	* folder:  ./test/... tests
	* use in memory db 
	* ==can steal helper function here==
	
	https://github.com/mapbox/node-sqlite3/blob/master/test/support/helper.js
	
	
* [lodash/lodash: A modern JavaScript utility library delivering modularity, performance, & extras.](https://github.com/lodash/lodash)

	Ref: [node.js - The difference between "require(x)" and "import x" - Stack Overflow](https://stackoverflow.com/questions/46677752/the-difference-between-requirex-and-import-x?rq=1)
	
	
	* folder: ./test
	* ==use [esm - npm](https://www.npmjs.com/package/esm)== to transpile 'imports'

	* [trentm/json: A "json" command for massaging JSON on your Unix command line.](https://github.com/trentm/json)

	useful way to test cli
	
	* each in one folder
	* cmd
	* expected.stdout
	* input
	* use one file to drive the folder[json/cli-cases.test.js at master · trentm/json](https://github.com/trentm/json/blob/master/test/cli-cases.test.js)

		
	* ==use child_press to exec bash==
	```
	var exec = require('child_process').exec;
	exec('bash cmd', {
            'cwd': dir
        }, function (error, stdout, stderr) {
            if (expectedExitCode !== null) {
                t.equal(expectedExitCode, error && error.code || 0, 'exitCode');
            }
            if (expectedStdout !== null) {
                t.equal(stdout, expectedStdout, 'stdout');
            }
            if (expectedStderr !== null) {
                t.equal(stderr, expectedStderr, 'stderr');
            }
            t.end();
        });

	```
	
	* [json/test/fickle-stdout at master · trentm/json](https://github.com/trentm/json/tree/master/test/fickle-stdout)

* [JoshuaWise/better-sqlite3: The fastest and simplest library for SQLite3 in Node.js.](https://github.com/JoshuaWise/better-sqlite3)

	test/
	
	use global option to prepare the test


	