---





category: regex
tags:
-  Programming
-  python
Ref:

Date: 2021-05-03

---




I need a simple regexp to tell [django-cors-headers · PyPI](https://pypi.org/project/django-cors-headers/) I want everything deployed in vercel ( ending with vercel.app) 

After some time in stack overflow, I finaly stitch together this solution and found a great place to visually debug regexp as well.

[Debuggex: Online visual regex tester. JavaScript, Python, and PCRE.](https://www.debuggex.com/r/E7N3Sscav7q9eFw1)

```python
r"^https://[\w-]+\.vercel\.app$"
```




