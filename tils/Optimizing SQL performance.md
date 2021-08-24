---

Date: 2021-08-16

Topic:
-  til
-  Postgresql cheatsheet
-  Performance Optimization - SLOW SQL


Ref:
-

---






### concepts


* types of index 	[Postgres Indexes Guide: When, How and Why to Use Them - Database Management - Blogs - Quest Community](https://www.quest.com/community/blogs/b/database-management/posts/a-guide-to-using-postgres-indexes)


	* B-Tree - default
	* 
	* Hash index
	
	> Hash indexes are best suited to work with equality operators. The equality operator looks for the exact match of data. Starting from Postgres 9.x version, the hash indexes are WAL-logged and crash-safe.

	* GiST Indexes
	
	> It can index complex data such as geometric data and network address data

	* GIN Indexes

	> The Generalized Inverted Index (GIN) is beneficial for indexing columns that have composite types. It is best suited for data types such as ==JSONB, Array, Range types and full-text search. ==


* multicolumn indxes:

	> A multicolumn B-tree index can be used with query conditions that involve any subset of the index's columns, but the index is most efficient when there are constraints on the leading (leftmost) columns.
	> Multicolumn indexes should be used sparingly. In most situations, an index on a single column is sufficient and saves space and time. Indexes with more than three columns are unlikely to be helpful unless the usage of the table is extremely stylized

	* composite index will speed up all subset columns
	
	* The exact rule is that equality constraints on leading columns,
	



* [Explaining the unexplainable – part 2 – select * from depesz;](https://www.depesz.com/2013/04/27/explaining-the-unexplainable-part-2/#seq-scan)

	* seq scan: 
	> PostgreSQL opens table file, and reads rows, one by one, returning them to user or to upper node in explain tree, for example to limit, as in:


	
	* index scan

* [The Case(s) Of Postgres Not Using Index - 5 min read](https://www.gojek.io/blog/the-case-s-of-postgres-not-using-index)

* what is operator class ?

	ref: [Operator classes explained - Cybertec](https://www.cybertec-postgresql.com/en/operator-classes-explained/)
	
	
* what does vacuum do ?
	
	* [PostgreSQL VACUUM and ANALYZE Best Practice Tips - 2ndQuadrant | PostgreSQL](https://www.2ndquadrant.com/en/blog/postgresql-vacuum-and-analyze-best-practice-tips/)




### postgresql profile query

* https://stackoverflow.com/questions/28879761/analysing-profiling-queries-on-postgresql

	try this out
	
* [PostgreSQL: Documentation: 9.3: EXPLAIN](https://www.postgresql.org/docs/9.3/sql-explain.html)

	read and understand the optiosn
	
* [Introduction to Profiling and Optimizing SQL Queries for Software Engineers | Scope](https://medium.com/scopedev/introduction-to-profiling-and-optimizing-sql-queries-for-software-engineers-3cf376ecc712)

	* finding and logging querys thats slow
	
		> Database Slow Query Log
		Most SQL databases provide a Slow Query Log, a log where the database	

		> [GitHub - jazzband/django-debug-toolbar: A configurable set of panels that display various debug information about the current request/response.](https://github.com/jazzband/django-debug-toolbar)

		> [Logging | Django documentation | Django](https://docs.djangoproject.com/en/3.0/topics/logging/#django-db-backends)

	* profile

		* explain command, to see the planning
		* EXPLAIN ANALYZe
		
		* how to read the result

			> The first tip is that, if we want to think about the steps the database would follow with our query sequentially, it helps to read from the bottom upwards.
		
			use a visualization tool
			
			==[New explain | explain.depesz.com](https://explain.depesz.com/)==
			
			[PostgreSQL execution plan operations](https://use-the-index-luke.com/sql/explain-plan/postgresql/operations)
			
			terms
			
		*  how to do optimize

			Most often optimizing your queries will be a matter of replacing a ==Seq Scan that is too big with an Index Scan==
			
			==When adding a new index we are trading off writing performance for query speed==
	***
	
	### postgres speed up aggregation
	
	
* sql, one big query or many small one perform better ?

* which type of indexing strateguy i shoiuld uise ?

	ref:
	
	[PostgreSQL: Documentation: 9.5: Index Types](https://www.postgresql.org/docs/9.5/indexes-types.html)
	
	



### postgresql query slow

* [How to Identify PostgreSQL Performance Issues with Slow Queries | Severalnines](https://severalnines.com/database-blog/how-identify-postgresql-performance-issues-slow-queries)

	skim
	
* [PostgreSQL Running Slow? Tips & Tricks to Get to the Source | Severalnines](https://severalnines.com/database-blog/postgresql-running-slow-tips-tricks-get-source)

	skim
	
* [Slow Query Questions - PostgreSQL wiki](https://wiki.postgresql.org/wiki/Slow_Query_Questions)

 	> * Read Using EXPLAIN if you haven't already.
	* ANALYZE relevant tables to ensure statistics are up to date;
	Collects updated stats on table size (ntuples, npages) and column values (nullfrac, ndistinct, MCVs, and histogram).
	Note that autovacuum does not currently handle analysis of a parent due to changes to or of its children. A parent table should be manually ANALYZEd after contents of its child tables changes significantly, such as after a DROP or ALTER..DETACH/ATTACH/UN/INHERIT, or bulk DELETE or UPDATE or many INSERTs.
	VACUUM relevant tables to avoid bloat and set relallvisible;
	* REINDEX relevant indices - resolves dead index tuples, bloat, and new index will have entries in order of heap TID; note, this will block queries (unless you use REINDEX CONCURRENTLY in v12; see also pg_repack)
	* Check your main GUC settings to make sure that they are set to sensible values (see Tuning Your PostgreSQL Server for additional hints):
	shared_buffers should be 10% to 25% of available RAM
	effective_cache_size should be 75% of available RAM
	* Test if you can reproduce the issue with a smaller query, or with different query parameters;
	* Test changing work_mem: increase it to 8MB, 32MB, 256MB, 1GB. Does it make a difference?
	* For Insert/Update/Delete queries, you should also try configuring your WAL:
	Move pg_wal to a separate storage device, if possible
	* Increase max_wal_size to 2GB or more (assuming you have disk space)
		good, read and try
	
* [Why is “IN” query slow on indexed column in PostgreSQL? | by Dhruv Agarwal | Shuttl Tech | Medium](https://medium.com/shuttl-tech/why-is-in-query-slow-on-indexed-column-in-postgresql-b716d9b563e2)
	> Why is this query slow, despite user_id being indexed? The question had me perplexed. I went through the PostgreSQL docs, some stack overflow posts and finally understood why.

	> that primary keys are always indexed in the table.
	> sequential scan in a table means validating against every record in sequence
	> algorithmic time complexity for searching on a B tree and sequential scan
	> composite indexes are indexed on the prefix.
	> why search complexity matters and can understand complexity analysis



	good, read it first

* https://www.postgresql.eu/events/fosdem2020/sessions/session/2838/slides/270/slow_queries.pdf

	skim

* [Optimize and Improve PostgreSQL Performance with VACUUM, ANALYZE, and REINDEX | Atlassian Support | Atlassian Documentation](https://confluence.atlassian.com/kb/optimize-and-improve-postgresql-performance-with-vacuum-analyze-and-reindex-885239781.html)
	> If you have your application running on a PostgreSQL database, there are some commands that can be run to improve and optimize performance. Three of these will be introduced in this article: VACUUM, ANALYZE, and REINDEX.

	autovacuum is on by default
	* how to check auto vacuum status ?

	```
	select name, setting from pg_settings where name = 'autovacuum' ;

	```
	
	* what does vacuum do ?

		Vacuum
		The VACUUM command will reclaim space still used by data that had been updated. In PostgreSQL, updated key-value tuples are not removed from the tables when rows are changed, so the VACUUM command should be run occasionally to do this.

		VACUUM can be run on its own, or with ANALYZE.
		
	* > REINDEX
	   > The REINDEX command rebuilds one or more indices, replacing the previous version of the index. REINDEX can be used in many scenarios, including the following (from Postgres documentation):
			An index has become corrupted, and no longer contains valid data. Although in theory this should never happen, in practice indexes can become corrupted due to software bugs or hardware failures. REINDEX provides a recovery method.
			An index has become "bloated", that is it contains many empty or nearly-empty pages. This can occur with B-tree indexes in PostgreSQL under certain uncommon access patterns. REINDEX provides a way to reduce the space consumption of the index by writing a new version of the index without the dead pages.
			You have altered a storage parameter (such as fillfactor) for an index, and wish to ensure that the change has taken full effect.
			An index build with the CONCURRENTLY option failed, leaving an "invalid" index. Such indexes are useless but it can be convenient to use REINDEX to rebuild them. Note that REINDEX will not perform a concurrent build. To build the index without interfering with production you should drop the index and reissue the CREATE INDEX CONCURRENTLY command.	
			
			```
			REINDEX TABLE mytable
			```
			
* [An Overview of VACUUM Processing in PostgreSQL | Severalnines](https://severalnines.com/database-blog/overview-vacuum-processing-postgresql)




### how to 

* what to do if postgres doesnt not use the index ?

	test using forceing the seq scan to off:
	
	```
	enable_seqscan=off 
	```
	ref : [sql - How do I force Postgres to use a particular index? - Stack Overflow](https://stackoverflow.com/questions/309786/how-do-i-force-postgres-to-use-a-particular-index)
	
	it could because of postgresl estimate the cost wrong, default is 4, as the two factor influence this :
	
	* cache
	* type of disk, ssd is 1.1

	> Reducing this value [...] will cause the system to prefer index scans; raising it will make index scans look relatively more expensive.

	```
	SET random_page_cost = 1;
	```

	> You can change the global default permanently with 
	> 
	```
	ALTER SYSTEM SET random_page_cost = 1;
	show random_page_cost;
	```
* how to change global system cost with rds ?
	ref: [postgresql - How to alter system on AWS RDS? - Database Administrators Stack Exchange](https://dba.stackexchange.com/questions/228807/how-to-alter-system-on-aws-rds)
	
	![[Pasted image 20210820124813.png]]
	
* how to visualize explain analyse result?

	[Plan created on August 20th 2021, 10:17 am | explain.dalibo.com](https://explain.dalibo.com/plan#)
	
	
	![[Pasted image 20210820101919.png]]

* how to list an index?

```sql

SELECT
    tablename,
    indexname,
    indexdef
FROM
    pg_indexes
WHERE
    schemaname = 'public'
ORDER BY
    tablename,
    indexname;
```
* how to drop an index?

* how to avoid db lock up when creating an index?

	using concurrent option
	
	![[Pasted image 20210820155135.png]]
	
* how can i check index building status

 ref: https://dba.stackexchange.com/questions/11329/monitoring-progress-of-index-construction-in-postgresql
> The column num_rows indicates how many rows are covered by your index and index_size will grow as the index is being built.

```sql
	SELECT
	  t.tablename,
	  indexname,
	  c.reltuples AS num_rows,
	  pg_size_pretty(pg_relation_size(quote_ident(t.tablename)::text)) AS table_size,
	  pg_size_pretty(pg_relation_size(quote_ident(indexrelname)::text)) AS index_size,
	  CASE WHEN indisunique THEN 'Y'
		ELSE 'N'
	  END AS UNIQUE,
	  idx_scan AS number_of_scans,
	  idx_tup_read AS tuples_read,
	  idx_tup_fetch AS tuples_fetched
	FROM pg_tables t
	  LEFT OUTER JOIN pg_class c ON t.tablename=c.relname
	  LEFT OUTER JOIN
		( SELECT c.relname AS ctablename, ipg.relname AS indexname, x.indnatts AS number_of_columns, idx_scan, idx_tup_read, idx_tup_fetch, indexrelname, indisunique FROM pg_index x
		  JOIN pg_class c ON c.oid = x.indrelid
		  JOIN pg_class ipg ON ipg.oid = x.indexrelid
		  JOIN pg_stat_all_indexes psai ON x.indexrelid = psai.indexrelid )
		AS foo
	  ON t.tablename = foo.ctablename
	WHERE t.schemaname='public'
	ORDER BY 1,2;
```

* why it show an error of "PostgreSQL Error: Relation already exists" when I create an index ?

	Ref: [identifier - PostgreSQL Error: Relation already exists - Stack Overflow](https://stackoverflow.com/questions/8792912/postgresql-error-relation-already-exists)
	
	because of the index name is collided with some value, change that

* how to do index for a jsonb field ?

	```
	 "body" -> 'well1' ->> 'txn_num' = '25244'
	```

	ref: [PostgreSQL: Documentation: 9.4: JSON Types](https://www.postgresql.org/docs/9.4/datatype-json.html)
	
	> GIN indexes can be used to efficiently search for keys or key/value pairs occurring within a large number of jsonb documents (datums). Two GIN "operator classes" are provided, offering different performance and flexibility trade-offs.

	> The default GIN operator class for jsonb supports queries with the @>, ?, ?& and ?| operators. (For details of the semantics that these operators implement, see Table 9-41.) An example of creating an index with this operator class is:


	
* how to and why do composite index ?

	when the app frequently do some combination then it make sense to do so, but should not more than 3, and the left most coluymn is hte most important
	
	
* how to take a db offline ?
	
	```
	ALTER DATABASE urbanspring CONNECTION LIMIT 1;
	```
	
	then you can login as super user
	
* how to change db master password?

	![[Pasted image 20210823140735.png]]
	
* what does the blue and red bar means in rds status ?

	ref: [Analyzing Amazon RDS Database Workloads with Performance Insights | AWS Database Blog](https://aws.amazon.com/blogs/database/analyzing-amazon-rds-database-workload-with-performance-insights/#:~:text=As%20the%20database%20load%20increases,capacity%2C%20it%20changes%20to%20red.&text=This%20indicates%20that%20the%20DB,Activity%20is%20expressed%20in%20Sessions.)
	
	

	

