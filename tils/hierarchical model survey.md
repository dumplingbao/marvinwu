---

Status: 
Date: 2021-07-20
Topic:
-  til
-  SQL
-  SQLite Cheatsheet

Ref:
---


### SQL hierarchy

* ==Offfical Example== [The WITH Clause](https://www.sqlite.org/lang_with.html#rcex1)

single parent

```sql
CREATE TABLE org(
  name TEXT PRIMARY KEY,
  boss TEXT REFERENCES org,
  height INT,
  -- other content omitted
);

```
query
```sql
WITH RECURSIVE
  works_for_alice(n) AS (
    VALUES('Alice')
    UNION
    SELECT name FROM org, works_for_alice
     WHERE org.boss=works_for_alice.n
  )
SELECT avg(height) FROM org
 WHERE org.name IN works_for_alice;
``` 


* [php - Creating a list tree with SQLite - Stack Overflow](https://stackoverflow.com/questions/3897952/creating-a-list-tree-with-sqlite)

> I usually prefer a design I call Closure Table,

> use recursive query
```
CREATE TABLE MyStruct (
  `TMPLID` text,
  `REF_TMPLID` text
);

INSERT INTO MyStruct
  (`TMPLID`, `REF_TMPLID`)
VALUES
  ('Root', NULL),
  ('Item1', "Root"),
  ('Item2', "Root"),
  ('Item3', 'Item1'),
  ('Item4', 'Item1'),
  ('Item5', 'Item2'),
  ('Item6', 'Item5');
And here is the main query, that
```

```
WITH RECURSIVE
  under_root(name,level) AS (
    VALUES('Root',0)
    UNION ALL
    SELECT tmpl.TMPLID, under_root.level+1
      FROM MyStruct as tmpl JOIN under_root ON tmpl.REF_TMPLID=under_root.name
     ORDER BY 2 DESC
  )
SELECT substr('....................',1,level*3) || name as TreeStructure FROM under_root
```



* [An sqlite3 demonstration of hierarchical data](https://gist.github.com/dylan-evans/887031)

good example

* [charles leifer | Querying Tree Structures in SQLite using Python and the Transitive Closure Extension](https://charlesleifer.com/blog/querying-tree-structures-in-sqlite-using-python-and-the-transitive-closure-extension/)

read it first


* [SQLite - Storing/editing hierarchical data sets](http://sqlite.1065341.n5.nabble.com/Storing-editing-hierarchical-data-sets-td20859.html)

read it first


* [Hierarchical Data in SQL: The Ultimate Guide - Database Star](https://www.databasestar.com/hierarchical-data-sql/)

good

* [Models for hierarchical data](https://www.slideshare.net/billkarwin/models-for-hierarchical-data)

skim

* [Hierarchical Data and How to Query It in SQL | LearnSQL.com](https://learnsql.com/blog/how-to-query-hierarchical-data/)

skim

* [sql - What are the options for storing hierarchical data in a relational database? - Stack Overflow](https://stackoverflow.com/questions/4048151/what-are-the-options-for-storing-hierarchical-data-in-a-relational-database)

good






