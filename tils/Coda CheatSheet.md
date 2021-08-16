---




Date: 2021-07-31

Topic:
-  til
-  coda

Ref:
-

---




### Filtered Table

* what field should I add to filter table?

	Filter Table:
	* Count
	* Show All
	* Show Selected
	* Filtered
	* Filtered Index
	
	
	For main table:
	* Selected: checkbox
	
* how to link filter table with main table?

```
[Element Filter 2].first().Filtered.contains(thisrow)
```

* how to reverse lookup ?

	Have a link of Elements to Articles, how to get Articles -> Elements
	
	
* how to implement filter base on lookup ?

==if(thisRow.Article.IsBlank(),true,Articles=thisRow.Article)==

Articles here is a short hand of currentValue.Articles

```
If(thisRow.[Show All],Element ,If(thisRow.[Show Selected],Element.filter(Selected) ,
Element.filter(
	and(
		If(thisRow.[Is Heading],CurrentValue.Rend.isnotBlank(),true),
		if(thisRow.Article.IsBlank(),true,Articles=thisRow.Article),
		If(thisRow.Search.IsBlank(),true ,CurrentValue.Summary.Contains(thisRow.Search.ToText())
		) )) ))
```

* how to implement a search function ?
```
==If(thisRow.Search.IsBlank(),true ,CurrentValue.Summary.Contains(thisRow.Search.ToText())==
```

```
          if(
            thisRow.[Search 2].IsBlank(),
            true,
            CurrentValue.Search.find(thisRow.[Search 2]) >= 0
          ),
```

* how to debug ?





