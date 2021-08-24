---

Topic: 
-  SQL
Date: 2021-01-21

---



* how to query a db with dynamic lookback time

```sql
select floor(extract(epoch from CURRENT_TIMESTAMP)/1800)*1800 AS "time", t2.metric, count(*) from
(select concat( '[', loc.id, '] ', loc.human_id, ' - ', loc.NAME ) as metric, avg(md.in_temp) as in_temp_avg, avg(md.chill_temp) as chill_temp_avg, count(*) as no_of_rows
from metric_data as md INNER JOIN "location" as loc on md.location_id = loc.id
where md.chill_on = 't' and time between now() - interval '100 mins' and now()
group by loc.human_id, loc.id, loc.name) as t2
where t2.chill_temp_avg > t2.in_temp_avg - (5 * t2.no_of_rows)
group by t2.metric

```

* How to assign user column modification priviligage ?

	![[Pasted image 20210615161343.png]]
	
	![[Pasted image 20210615161354.png]]


* what is precision and scale means in [[ORM and SqlAlchemy]] numeric type?

	ref: [An Overview Of PostgreSQL NUMERIC Type with Examples](https://www.postgresqltutorial.com/postgresql-numeric/)

	precision is total number of digits, and scale is the fraction part, after the . eg. 5.12355, precision is 6 and scale is 5

	when you create the field in navicat, 
	![[Pasted image 20210316135221.png]]
	> Use the Length edit box to define the length of the field and use Decimals edit box to define the number of digits after the decimal point (the scale) for Floating Point data type.

	length = precision, scale = decimals

	when declare it in models of [[Django And Django Rest]], there are two method,
	
	* using django build in, max_digits is total number of digits = precision, and decimal_places is scale, the fraction part
	```
	    dispd_temp = models.DecimalField(max_digits=65535, decimal_places=2, blank=True, null=True)

	```
	

	

psql -h well2-pg-test-sg.ctegqew7dqvi.ap-southeast-1.rds.amazonaws.com -U postgres



* how to get the table information

SELECT * FROM  information_schema.columns isc
  WHERE isc.table_schema::text = 'public'::text
  ORDER BY isc.table_name, isc.ordinal_position;

* how to select the db 
* 
urbanspring

* how to get data dictionary from sql 
```
SELECT



 isc.table_name,
 isc.ordinal_position::integer AS ordinal_position,
 isc.column_name::character varying AS column_name,
 isc.column_default::character varying AS column_default,
 isc.data_type::character varying AS data_type,
 isc.character_maximum_length::integer AS str_length,
        CASE
            WHEN isc.udt_name::text = 'int4'::text OR isc.udt_name::text = 
'bool'::text THEN isc.data_type::character varying
            ELSE isc.udt_name::character varying
        END AS udt_name



   FROM information_schema.columns isc
  WHERE isc.table_schema::text = 'public'::text
  ORDER BY isc.table_name, isc.ordinal_position;
  
  ````
  
  