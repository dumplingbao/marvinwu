---




---




* [Class 1: Unix™ for Poets](https://ftyers.github.io/079-osnov-programm/classes/01.html)

	look and practice
	
	
* [Finding URLs for web corpora — trafilatura 0.9.0 documentation](https://trafilatura.readthedocs.io/en/latest/sources.html)

	the main problem it is trying to resolve  is to try to seed the crawl properly to get unbias set of text
	
	* search engine
	* common crawl
	* social media
	* random doc from internet
	
	> Previously collected tweet IDs can be “hydrated”, i.e. retrieved from Twitter in bulk. see for instance:

* [Tutorial: Gathering a custom web corpus — trafilatura 0.9.0 documentation](https://trafilatura.readthedocs.io/en/latest/tutorial0.html)

	 > Trafilatura supports two different ways to gather further links ==web feeds (Atom and RSS)== or ==sitemaps==. As a result, a comprehensive overview of the available documents can be obtained faster and more efficiently than by systematically extracting and following links within a website.

	```
	# run link discovery through a sitemap for sitemaps.org and store the resulting links in a file
	$ trafilatura --sitemap "https://www.sitemaps.org/" --list > mylinks.txt
	# using an already known sitemap URL
	$ trafilatura --sitemap "https://www.sitemaps.org/sitemap.xml" --list
	# targeting webpages in German
	$ trafilatura --sitemap "https://www.sitemaps.org/" --list --target-language "de"
	```

	download txt to stsructure data
	
	```
	trafilatura --xml -i links.txt -o xmlfiles
	
	```
	
	tokenize
	
	```
	$ somajo-tokenizer --xml xmlfiles/filename.xml
	
	```
	
* [v. A Gentle Introduction to XML - The TEI Guidelines](https://tei-c.org/release/doc/tei-p5-doc/en/html/SG.html)

> XML is a ==metalanguage==, that is, a language used to describe other languages, i

> Compared with HTML

> XML is extensible: it does not consist of a fixed set of tags;
> XML documents must be well-formed according to a defined syntax;
an XML document can be formally validated against a set of schema rules for consistent application;
* XML is more interested in the ==meaning of data than in its presentation==.

* [TextBlob: Simplified Text Processing — TextBlob 0.16.0 documentation](https://textblob.readthedocs.io/en/dev/)



	
* [Filtering links to gather texts on the web - Bits of Language: corpus linguistics, NLP and text analytics](https://adrien.barbaresi.eu/blog/link-filtering-courlan-python.html)

	read
	
	
* [Evaluating scraping and text extraction tools for Python - Bits of Language: corpus linguistics, NLP and text analytics](https://adrien.barbaresi.eu/blog/evaluating-text-extraction-python.html)

* [Extracting the main text content from web pages using Python - Bits of Language: corpus linguistics, NLP and text analytics](https://adrien.barbaresi.eu/blog/trafilatura-main-text-content-python.html)

* [Ad hoc and general-purpose corpus construction from web sources - Bits of Language: corpus linguistics, NLP and text analytics](https://adrien.barbaresi.eu/blog/web-corpus-construction-phd-thesis.html)


* [Keyword Extraction: from TF-IDF to BERT | Towards Data Science](https://towardsdatascience.com/keyword-extraction-python-tf-idf-textrank-topicrank-yake-bert-7405d51cd839)

	very good, look into details