---




---




* how to use named insert in sqlite?

```
// The following are equivalent.
const stmt = db.prepare('INSERT INTO people VALUES (@firstName, @lastName, @age)');
const stmt = db.prepare('INSERT INTO people VALUES (:firstName, :lastName, :age)');
const stmt = db.prepare('INSERT INTO people VALUES ($firstName, $lastName, $age)');
const stmt = db.prepare('INSERT INTO people VALUES (@firstName, :lastName, $age)');

stmt.run({
  firstName: 'John',
  lastName: 'Smith',
  age: 45
});


```

* how to create a table if not exist?

```
  CREATE TABLE IF NOT EXISTS job_meta (
            id integer NOT NULL,
            [status]  TEXT NOT NULL,
            [description] TEXT NOT NULL,
            [sql_instruction] TEXT NOT NULL,
            [assigned_to] TEXT,
            PRIMARY KEY (
                id
            )
        );
```


* how to join array

* how to create a in memory db and load data ?

```


```

* how to create enum in sqlite?

Ref: [How to create ENUM type in SQLite? - Stack Overflow](https://stackoverflow.com/questions/5299267/how-to-create-enum-type-in-sqlite)
```
CREATE TABLE prices (
 id         INTEGER                                PRIMARY KEY,
 pName      TEXT CHECK( LENGTH(pName) <= 100 )     NOT NULL DEFAULT '',
 pType      TEXT CHECK( pType IN ('M','R','H') )   NOT NULL DEFAULT 'M',
 pField     TEXT CHECK( LENGTH(pField) <= 50 )     NULL DEFAULT NULL,
 pFieldExt  TEXT CHECK( LENGTH(pFieldExt) <= 50 )  NULL DEFAULT NULL,
 cmp_id     INTEGER                                NOT NULL DEFAULT '0'
)

```

* how to create sqlite primary key?


```
CREATE TABLE table_name(
   column_1 INTEGER NOT NULL PRIMARY KEY

);


```

* how do you select a column when there is a : colon in the column name?

```
SELECT `id:id` FROM companies_info WHERE tickerSymbol = '030610';
or
SELECT 
        
       [source:1] source,
       [source_id:1] source_id,
```



* how to create composite key?

```
CREATE TABLE table_name_c(
   column_1 INTEGER NOT NULL,
   column_2 INTEGER NOT NULL,
   PRIMARY KEY(column_1,column_2)
);
```



* how to join on like?

```

```

* how to insert to sqlite 
```
| sqlite-utils insert data/index.db raw - --alter

```

* how upsert is differnt from replace or insert ?

[sql - SQLite - UPSERT *not* INSERT or REPLACE - Stack Overflow](https://stackoverflow.com/questions/418898/sqlite-upsert-not-insert-or-replace)

> Boom, you've lost the name of the employee number 1. SQLite has replaced it with a default value.

The expected output of an UPSERT would be to change the role and to keep the name.


```
INSERT OR REPLACE INTO Employee ("id", "name", "role") VALUES (1, "John Foo", "CEO") # do nothing
INSERT OR REPLACE INTO Employee ("id", "role") VALUES (1, "code monkey") update

INSERT INTO con_match (source, source_id,con_id)
SELECT 'a' source, id source_id, id con_id
FROM   a

INSERT OR REPLACE INTO con_match (source, source_id,con_id)
SELECT 'a' source, id source_id, id con_id
FROM  a
```

[SQLite: upsert clause](https://renenyffenegger.ch/notes/development/databases/SQLite/sql/insert/upsert/index)


```
insert into T values (1, 'one'  ) on conflict do nothing;

insert into T values (1, 'one'  ) on conflict(id) do update set val=excluded.val;

```

* how to do upsert in sqlite?

```
echo '{"id": 2, "age": 4}' | \
    sqlite-utils upsert dogs.db dogs - --pk=id
```

```
sqlite-utils insert data/index.db raw raw/index.json --alter

```
* how to enable and use full text search ?

```
# disable index
sqlite-utils disable-fts data/index.db data_wos

# enable fts indexing, it will create a tablename_fts

sqlite-utils enable-fts data/index.db data_wos title Scientific_Name Common_Names


# run query
SELECT * FROM data_wos_fts where data_wos_fts match 'Ballerina'

# with ranking

SELECT *,bm25(data_wos_fts) FROM data_wos_fts where data_wos_fts match 'Ballerina'

```

* how to invoke sqlite console?

```
sqlite3

```

* sqlite console cheat sheet

```
.databases
.tables

```

* interesting functions

```
defaults: COALESCE()

```

* how to load extension in sqlite console ?

```
.load sqlite_extensions/text
```

* in sqlitestudio ?

```sql
select load_extension('/Users/marvinwu/staging/codes/rankequity/bits-test/sql-lite-1/text.dylib')
```
* using sqlite-util?

* how to use json group array ?

```
SELECT title,
       json_group_array(json_object('title', quick_look_title, 'content', quick_look_content) ) AS quick_looks
  FROM type_quick_view_30
 GROUP BY title order by quick_look_title
```

[github: select issues.number, issues.title, issues.state, json_group_array(json_object('name', labels.name, 'color', labels.color)) as labels from issues join issues_labels on issues.id = issues_labels.issues_id join labels on issues_labels.labels_id = labels.id group by issues.id order by count(labels.id) desc limit 101](https://github-to-sqlite.dogsheep.net/github?sql=select+issues.number%2C+issues.title%2C+issues.state%2C%0D%0A++json_group_array%28json_object%28%27name%27%2C+labels.name%2C+%27color%27%2C+labels.color%29%29+as+labels%0D%0Afrom+issues%0D%0A++join+issues_labels+on+issues.id+%3D+issues_labels.issues_id%0D%0A++join+labels+on+issues_labels.labels_id+%3D+labels.id%0D%0Agroup+by+issues.id%0D%0Aorder+by+count%28labels.id%29+desc+limit+101)

* what is the difference between virtual table and table and view ?

virtual table seems for program to access, and view is read only virtual table for human


* how to split on a specific character?

```
SELECT 'https://pythonawesome.com'|| substr(image,0, instr(image, ' ') )
  FROM python_25;
```

* sqlite export csv

```
sqlite3 -header -csv data/sands.db 'select * from output_blog_20' >data/blogs.csv
```

* sqlite output json

```
sqlite-utils data/sands.db "select * from type_quick_view_10 limit 2" --json-cols > test.json
```

* where can I find sqlite extensions?

	ref: [GitHub - nalgeon/sqlean: All the missing SQLite functions](https://github.com/nalgeon/sqlean/)
	
	==unicode, split part, regex tract==
	
	
* how to get ride of u201c?


* how to flatten json array ?

```sql
select value from quick_look, json_each(quick_look.quick_look)

```

* how to join array item togheter ?

```sql
SELECT name,
       title,
       group_concat(content, '. ') content_joined
  FROM (
           SELECT atom content,
                  *
             FROM _quick_look_flatten_2,
                  json_each(_quick_look_flatten_2.content) 
       )
 GROUP BY name,
          title;


```
* how to cut left 6 string from a field ?

```
    substr(_path, 6, length(_path)) AS url,

```
* exec sql ?

```
sqlite-utils data/sands.db "SELECT title,
       json_group_array(json_object('title', quick_look_title, 'content', quick_look_content) ) AS quick_looks
  FROM type_quick_view_30
 GROUP BY title order by quick_look_title"
```


* how to output csv to a file

```
sqlite3 -header -csv data/sands.db 'select * from output_blog_20' >data/blogs.csv

```
* how to list columns

```
pragma table_info(type_meta_30)

```

![[Pasted image 20210513233408.png]]

* how to extract key, value from json ?
```
SELECT json_extract(value, '$.title') AS title,
       json_extract(value, '$.content[0]') AS content
  FROM quick_look_flatten;

```
![[Pasted image 20210513235038.png]]
* join array ?

* views, virtual tables ?

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


