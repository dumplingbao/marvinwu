---

Status: 
Date: 2021-04-22
Topic:
-  Django And Django Rest
Ref:
---

* How to hide a endpoint from auto doc gen?
```python
    @swagger_auto_schema(auto_schema=None)
    def list(self, request):

```

* how to hide the inherited method?

```python
@method_decorator(name="update", decorator=swagger_auto_schema(auto_schema=None))
@method_decorator(name="retrieve", decorator=swagger_auto_schema(auto_schema=None))
class LocationViewSet(viewsets.ModelViewSet, QuerysetMixin):

```


* how to prevent it list out models?

```pyhon
#core/settings/default.py



SWAGGER_SETTINGS = {"DEFAULT_FIELD_INSPECTORS": ["drf_yasg.inspectors.InlineSerializerInspector"]}

```




