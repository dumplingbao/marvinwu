---

---

### cheatsheet

* how to make datasette output json array ?

```
?_shape=arrays - "rows" is the default option, shown above
?_shape=objects - "rows" is a list of JSON key/value objects
?_shape=array - an JSON array of objects
?_shape=array&_nl=on - a newline-separated list of JSON objects
?_shape=arrayfirst - a flat JSON array containing just the first value from each row
?_shape=object - a JSON object keyed using the primary keys of the rows

```


## Interesting things to try

* [Running SQL queries — Datasette documentation](https://docs.datasette.io/en/latest/sql_queries.html#cross-database-queries)

* [Facets — Datasette documentation](https://docs.datasette.io/en/latest/facets.html)

* [Full-text search — Datasette documentation](https://docs.datasette.io/en/latest/full_text_search.html)

* can use this for TIL [markdown-to-sqlite - a tool for Datasette](https://datasette.io/tools/markdown-to-sqlite)


* > Every row in every Datasette table has its own URL. This means individual records can be linked to directly.

