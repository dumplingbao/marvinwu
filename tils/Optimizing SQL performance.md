---




Date: 2021-08-16

Topic:
-  til
-  Postgresql cheatsheet

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



* [Explaining the unexplainable – part 2 – select * from depesz;](https://www.depesz.com/2013/04/27/explaining-the-unexplainable-part-2/#seq-scan)

	* seq scan: 
	> PostgreSQL opens table file, and reads rows, one by one, returning them to user or to upper node in explain tree, for example to limit, as in:


	
	* index scan

* [The Case(s) Of Postgres Not Using Index - 5 min read](https://www.gojek.io/blog/the-case-s-of-postgres-not-using-index)

* what is operator class ?

	ref: [Operator classes explained - Cybertec](https://www.cybertec-postgresql.com/en/operator-classes-explained/)
	
	
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
			
			[New explain | explain.depesz.com](https://explain.depesz.com/)
			
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
	```




