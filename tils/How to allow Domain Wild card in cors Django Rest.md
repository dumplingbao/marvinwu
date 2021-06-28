---





Topic:
-  Django And Django Rest
-  CORS
Ref:

Date: 2021-05-03

---




First try: add it in the CORS_ORIGIN_WHITELIST,  [
    "https://*.example.hk",
	]
	
-- Doesn't work, I think because of the corsheaders plugin don't take the *.example.hk as a wild card


Then I figure it out, because I want all my vercel deployment which ended in domain *.vercel.app got white listed, I put the following code in 

```python
#settings.py

CORS_ALLOWED_ORIGIN_REGEXES = [r"^https://[\w-]+\.vercel\.app$"]


```




