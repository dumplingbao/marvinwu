---

Status: 
Date: 2021-05-07
Topic:
-  Text Parsing

Ref:
---






* [GitHub - BurntSushi/xsv: A fast CSV command line toolkit written in Rust.](https://github.com/BurntSushi/xsv)

	use sql to filter and group and query csv
	> ==frequency - Build frequency tables of each column in CSV data. (Uses parallelism to go faster if an index is present.)==
	> sample


* 	[GitHub - dinedal/textql: Execute SQL against structured text like CSV or TSV](https://github.com/dinedal/textql)
	> Its key difference with TextQL and similar alternatives is it works on streams instead of importing everything in a SQLite then querying it. It seems strange to read a whole file in memory then perform a `SELECT` query on it when you could just run that query while reading the file. That means a much lower memory footprint and faster execution, but on the other hand you can only use the subset of SQL that’s implemented.

	> Key differences between textql and sqlite importing
		==sqlite import will not accept stdin, breaking unix pipes. textql will happily do so.==
		textql supports quote-escaped delimiters, sqlite does not.
		textql leverages the sqlite in-memory database feature as much as possible and only touches disk if asked.

* good thread [TextQL: Execute SQL Against CSV or TSV | Hacker News](https://news.ycombinator.com/item?id=16781294)

		
	> For anyone looking to do this with plain SQLite, one can ==import a CSV ==by running (in the REPL)
		```
			.mode csv
			.headers on
			.import my.csv tablename
		```
* [Graduate from Sed and Sort to Lnav, the Logfile Navigator](https://innolitics.com/articles/graduate-from-sed-and-sort-to-lnav-the-logfile-navigator/)
	> Many medical applications run within a closed network. This arrangement can make investigating software bugs more difficult because the only readily available information is an (often vague and incomplete) recounting of the problem, a zip file filled with system and application logfiles, and the application source code.

	> ==replace sed and sort==


	looks very good for log parser [The Log File Navigator](https://lnav.org/)

	

* [GitHub - kamac/AskXML: Run SQL statements on XML documents](https://github.com/kamac/AskXML)

	use SQL to query xml
	
	> There are data dumps like stack exchange's, stored in XML. They're big, so fitting them whole into memory is not desired. With AskXML you can query things fast, and rather comfortably (provided you know SQL).

* convert SQL to bash script [Bigbash It! - Convert SQL queries into bash scripts](http://bigbash.it/)

	![[Pasted image 20210507175048.png]]
	
* use SQL instead of awk to query files, interesting [GitHub - dbohdan/sqawk: Like Awk but with SQL and table joins](https://github.com/dbohdan/sqawk)	

	![[Pasted image 20210507175238.png]]
	
* probably best in text sql[q - Text as Data](http://harelba.github.io/q/)	

* [GitHub - BatchLabs/charlatan: SQL-like Query Language](https://github.com/BatchLabs/charlatan#charlatan)

	this one support json