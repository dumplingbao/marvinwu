---





Date: 2021-06-08
Topic:
-  HOPE-Project
-  ETL
-  TDD

Ref:
---




#### test driven data processing

* [Europython2018-Introduction-to-Pandas.key](https://ep2018.europython.eu/media/conference/slides/replacement-training.pdf)

	#🚧  try to find tutorial
	
	![[Pasted image 20210608142902.png]]
	
	thats what data tdd is about ?
	
	> 	1. Constraint Discovery & Verification
			a bit like unit tests for data
			• can cover inputs, outputs and intermediate results
			• automatically discovered
			• more-or-less including regular expressions for
			characterising strings (Rexpy)
			• Use as part of analysis to verify inputs, outputs and
			intermediates (as appropriate)

	* tdda library
			
	> pip install tdda
	
* [tdda/tdda: Test-Driven Data Analysis Functions](https://github.com/tdda/tdda)

	> the TDDA Python module provides command-line and Python API support for the overall process of data analysis, through the following tools:
	> ==Reference Testing: ==extensions to unittest and pytest for managing testing of data analysis pipelines, where the results are typically much larger, and more complex, than single numerical values.
	> ==Constraints:== tools (and API) for discovery of constraints from data, for validation of constraints on new data, and for anomaly detection.
	> ==Finding Regular Expressions: ==tools (and API) for automatically inferring regular expressions from text data.


	
* [How to develop data pipeline in Airflow through TDD (test-driven development) | by Marcos Marx | Magrathea](https://blog.magrathealabs.com/how-to-develop-data-pipeline-in-airflow-through-tdd-test-driven-development-c3333439f358)

	> TDD generates a conflict due to the code having to have external dependencies. One of the biggest problems with testing a data project's functions is that they depend on the data they are running or an external system.

	> that when working with real data, there are two moving parts: the data (and its quality) and your cod


* [Automated Testing For Protecting Data Pipelines from Undocumented Assumptions - YouTube](https://www.youtube.com/watch?v=z-kPgEAJCrA)

	0:45 pipelien debt !
	1:17 missing test and doc
	3:16 data pipeline by definiete tend to become spagattie to be more valurable
	4:18 need automated tesig
	4:54 code and data is both untrusted
	6:14 great expections, 2018
	6:58 declartation-> expection of data
	10:16 expectations
	12:34 publish data defintion
	
	==[great-expectations/great_expectations: Always know what to expect from your data.](https://github.com/great-expectations/great_expectations)
	
	
* [Data’s Inferno: 7 Circles of Data Testing Hell with Airflow | by WB Advanced Analytics | wbaa | Medium](https://medium.com/wbaa/datas-inferno-7-circles-of-data-testing-hell-with-airflow-cef4adff58d8)


* [How to use Test Driven Development in a Data Science Workflow | by Timo Böhm | Towards Data Science](https://towardsdatascience.com/tdd-datascience-689c98492fcc)

	read it fist
	
		
* [The Keys To Unlock TDD For Data Engineering | by David O'Keeffe | Servian | Medium](https://medium.com/weareservian/modern-data-engineering-testing-part-2-the-keys-to-unlock-your-test-suite-a3337b7b1278)

	read it first
	
* [The challenge of testing Data Pipelines | by Blake Norrish | Slalom Build | Medium](https://medium.com/slalom-build/the-challenge-of-testing-data-pipelines-4450744a84f1)

	read it first

* [How do you write unit tests for a data engineering-oriented project? : dataengineering](https://www.reddit.com/r/dataengineering/comments/i0ibhz/how_do_you_write_unit_tests_for_a_data/)

	seems interesting, read it first
	
* [Why Data Testing Won’t Prevent Broken Data Pipelines | by Barr Moses | Towards Data Science](https://towardsdatascience.com/why-testing-your-data-is-insufficient-6914275a9762)

	read

* [Unit Test Your Data Pipeline, You Will Thank Yourself Later - KDnuggets](https://www.kdnuggets.com/2020/08/unit-test-data-pipeline-thank-yourself-later.html)

	testing with examples

* skim [Test-Driven Data Analysis](http://www.tdda.info/?from=@)
	
* [How do we test ETL pipelines? Part one unit tests](https://the.agilesql.club/2019/07/how-do-we-test-etl-pipelines-part-one-unit-tests/)

	skim
	
* [Test-Driven Development in Data Science | by Mrigank Shekhar | MiQ Tech and Analytics | Medium](https://medium.com/miq-tech-and-analytics/test-driven-development-in-data-science-190f1247ebbc)
	
	skim
* [Software Engineering for Data Scientist – Test-Driven Development](https://www.linkedin.com/pulse/software-engineering-data-scientist-test-driven-gopinadhan-jagan-)	

	skim
	
* [Why Great Data Engineering Needs Automated Testing | by David O'Keeffe | Servian | Medium](https://medium.com/weareservian/why-data-engineering-needs-automated-testing-a37a0844d7db)

	skim
	
	
	



