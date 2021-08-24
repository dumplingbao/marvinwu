---

Status: 
Date: 2021-08-18
Topic:
-  Django

Ref:
-

---

### concepts

* what is WSGI application ?

* why do we need gunicorn?

* 

### optimize django performance
* [Performance and optimization | Django documentation | Django](https://docs.djangoproject.com/en/3.2/topics/performance/)
	official, read it first
	
	* Performance benchmarking

	> Django tools
	> ==django-debug-toolbar== is a very handy tool that provides insights into what your code is doing and how much time it spends doing it. In particular it can show you all the SQL queries your page is generating, and how long each one has taken.

	* Work at approprate level

	> However, it will almost always be faster to do this work at lower rather than higher levels. At higher levels the system has to deal with objects through multiple levels of abstraction and layers of machinery.
	> That is, the database can typically do things faster than Python can, which can do them faster than the template language can:
	
	DB >> Python >> Template
	
	
	Optimization methods:
	
	* Caching

		> For convenience, Django offers different levels of cache granularity: you can cache the output of specific views, or only the pieces that are difficult to produce, or even an entire site.
		> 
			Ref: https://docs.djangoproject.com/en/3.2/topics/cache/
	
		> cached_property

		can ask django to cache a property intead of computing it
		
	* Laziness

		* Queryset is lasy, 
		* keep_lazy

	* DB optimization

	* Perrsist connection

	> ==Persistent connections==
	> Persistent connections avoid the overhead of re-establishing a connection to the database in each request. They’re controlled by the CONN_MAX_AGE parameter which defines the maximum lifetime of a connection. It can be set independently for each database.

	> The default value is 0, preserving the historical behavior of closing the database connection at the end of each request. To enable persistent connections, set CONN_MAX_AGE to a positive integer of seconds. For unlimited persistent connections, set it to None.

	* gernal way Using pypy

	> PyPy is an implementation of ==Python in Python itself (the ‘standard’ Python implementation is in C)==. PyPy can offer substantial performance gains, typically for heavyweight applications.
* [Database access optimization | Django documentation | Django](https://docs.djangoproject.com/en/3.2/topics/db/optimization/)


	* Profile first
		* queryset.explain
		* debug toolbar
	* optimize DB, 
		* do more work in DB level	
		* using index
	* optimize QuerySet
	* do things in bulk

		> CUD in bulk
			When creating objects, where possible, use the bulk_create() method to reduce the number of SQL queries. For example:
			```
			Entry.objects.bulk_create([
				Entry(headline='This is a test'),
				Entry(headline='This is only a test'),
			])
			```


***

[[fargate settting]]

	
***

* [Guide to Django Performance Testing and Optimization | Toptal](https://www.toptal.com/python/performance-optimization-testing-django)

	skim

* [Is Django too slow?](https://mattsegal.dev/is-django-too-slow.html)

	skim
* [15 Amazing Django Performance Optimization Tips](https://www.esparkinfo.com/django-performance-tips.html)

	skim	

