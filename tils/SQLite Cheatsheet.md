---

Date: 2021-07-11

Topic:
-  til
-  SQLite Survey

Ref:


---

* how to join multiple table ?

```
create table feed_30 as
select
    *
from
    feed_10
    left join keywords_10 on keywords_10.id = feed_10.id
    left join feed_20 on feed_20.id = feed_10.id
```
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

* how to extract/select elementment from a json array ?

```
select json_extract(canonical,'$[0].href') as testfrom from feed
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




