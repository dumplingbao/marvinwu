---

---



### sql-util and datteseete

[sqlite-utils command-line tool — sqlite-utils 3.6 documentation](https://sqlite-utils.datasette.io/en/stable/cli.html#running-queries-and-returning-json)

[Plugins — Datasette documentation](https://docs.datasette.io/en/latest/plugins.html)

### sql concepts and tutorial

* good one with sample db [Introduction to Sqlite | IVYMobility TechBytes](https://medium.com/ivymobility-developers/mastering-in-sqlite-introduction-50fabfe59415)
	* [superHeros .sqlite - Google Drive](https://drive.google.com/file/d/13t9LB22KLYpDW-XVoz1NDAGrVOlXRRUN/view)
* [Views in Sqlite | IVYMobility TechBytes](https://medium.com/ivymobility-developers/mastering-in-sqlite-view-c19cee8c3394)

* [SQLite views, triggers, transactions](https://zetcode.com/db/sqlite/viewstriggerstransactions/)
	good explaination
	
	views => ==similar to vds== read only table
	trigger => build in zparier
	
	
### sqlite ETL

* skim [Turbocharging ETL jobs with SQLite and Nodejs! | by Frank Baele | The Startup | Medium](https://medium.com/swlh/turbocharging-etl-jobs-with-sqlite-and-nodejs-ae66b049083)

	> Another challenge is doing fast aggregations on our data set, again SQLite got us covered. SQLite has build-in aggregation functions or allows us to write our custom functions.


* study the process [Using SQLite in my ETL processes is something I have done for over a decade. It... | Hacker News](https://news.ycombinator.com/item?id=22153447)

	> The input data is loaded into the appropriate tables and then indexed as appropriate (or if appropriate). It is as "raw" as I can get it.
		Each successive transformation occurs on a new table. This is so I can always go back one step for any post-mortem if I need to. Also, I can reference something that might be DELETEd in an a later table.
	> I am not a very talented programmer so I stick very close to what is common, standard, and easy to understand. It usually means I am on the downslope of the hype cycle and it limits some opportunities but I have become okay with that.
	> ==They are The Definitive Guide to SQLite by Mike Owens and Using SQLite by Jay A. Kreibich. I am quite sure they are more book than I needed, I only plumbed a fraction of SQLite's immense capabilities.

### sqlite JSON


```
select json_extract('{"a":2,"c":[4,5,{"f":7}]}', '$.a') as test

```

good Ref: 


* [Modeling one-to-many in SQlite using the JSON1 extension · [Thinking inside a large box];](http://blog.benjamin-encz.de/post/sqlite-one-to-many-json1-extension/)
	
	> ![[Pasted image 20210513170843.png]]	
	

* [SQLite is not a toy database | Anton Zhiyanov](https://antonz.org/sqlite-is-not-a-toy-database/)
	> Sets? No problem: UNION, INTERSECT, EXCEPT are at your service.


	

* [SQLite 文档存储攻略_Tony.Dong的专栏-CSDN博客](https://blog.csdn.net/horses/article/details/110274164)
	this is good tutorial, ==todo ==
	
	use sqlite console
	
	![[Pasted image 20210513172203.png]]

* [重识 SQLite，简约不简单_Tony.Dong的专栏-CSDN博客](https://tonydong.blog.csdn.net/article/details/116255214#comments_16363749)

	virtual table ?
	
	> create virtual table temp.blocks_csv using vsv(
    filename="ipblocks.csv",
    schema="create table x(network text, geoname_id integer, registered_country_geoname_id integer, represented_country_geoname_id integer, is_anonymous_proxy integer, is_satellite_provider integer, postal_code text, latitude real, longitude real, accuracy_radius integer)",
    columns=10,
    header=on,
    nulls=on


* how to extract array into a new record ?

```
CREATE TABLE test_1 as 
select
  type.title,
  type.description,
  key,
  value,
  type,
  atom,
  id,
  parent,
  fullkey,
  path
from
  type,
  json_each(type.description)

```

* select to create new table

### SQLite string function

* [SQLite String Functions](https://www.sqlitetutorial.net/sqlite-string-functions/)


### SQLite split by

--- 

* [使用 Python 的 SQLite JSON1 和 FTS5 擴充套件 | 程式前沿](https://codertw.com/ios/19751/)


