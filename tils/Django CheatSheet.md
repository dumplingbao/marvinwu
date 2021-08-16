---




Date: 2021-07-29

Topic:
-  til
-  django

Ref:
-

---




### Concepts
* How does migration work in django ?


	there is a table in the db django_migration that keeps the pointer of current migration, and when you do 

	```
	pipenv run python manage.py makemigrations
	pipenv run python manage.py migrate
	```


	it will check the the app migration pointer with the script version, if not matching it will require you to run migration.

	The best practice is when you have schema change and wnat to change env, use production env to run api in local 
* what does the serializers do in dango?

	> The serializers in REST framework work very similarly to Django's Form and ModelForm classes
	> Serializer fields handle converting between primitive values and internal datatypes. They also deal with validating input values, as well as retrieving and setting the values from their parent objects.
	
	ref: [10 things you need to know to effectively use Django Rest Framework | Blog - Profil Software, Python Software House With Heart and Soul, Poland](https://profil-software.com/blog/development/10-things-you-need-know-effectively-use-django-rest-framework/)
	
	> which act as translators between Django model instances and their representations such as json.
* what is query set?
	query set is a collection of the objects the fits your query
	
	access the queryset by model.objects.
	```python
	Snippet.objects.all() -> ORM relationship of the table
	# it returns query set for all objects
	serializer_class = UserSerializer
	for each in queryset:
		print(each.username)

	```
* what's the difference b/w an app and a project?

	project is the monorepo and app is the individual package	
* what's the differenece between session and cookie
	* cookie is usually the id of session, it is used as a key to read server side information
	* cookies are sent automatically
	session is the state
* what is csrf token?
 
	Since we’re creating a POST form (which can have the effect of modifying data), we need to worry about Cross Site Request Forgeries. Thankfully, you don’t have to worry too hard, because Django comes with a helpful system for protecting against it. In short, all POST forms that are targeted at internal URLs should use the {% csrf_token %} template tag.

	> We are using the reverse() function in the HttpResponseRedirect constructor in this example. This function helps avoid having to hardcode a URL in the view function. It is given the name of the view that we want to pass control to and the variable portion of the URL pattern that points to that view. In this case, using the URLconf we set up in Tutorial 3, this reverse() call will return a string like	
### ORM and DB
* what's the best practice when designing model.py ?

	implement __str__ and get_absolute_url
* what is hyperliked relationship
* when do we need to migrate again?
* what should be always added to models.py ?
	> “ In short, you should add a get_absolute_url() and __str__() method to each model you write.”
	Excerpt From: William S. Vincent. “Django for Beginners”. Apple Books. 
* how to get primary key one ?

	```
	>>> Question.objects.get(pk=1)

	```
* how to get all objects from one to many relationship?

	>>> q.choice_set.all()
* How to follow relationships?

	Choice.objects.filter(question__pub_date__year=current_year)
* how to reset database in django rest

	```
	rm -f db.sqlite3
	rm -r snippets/migrations
	python manage.py makemigrations snippets
	python manage.py migrate
	```
* how to check what each migration does in sql?
	```
	$ python manage.py sqlmigrate polls 0001
	```	
* how to refresh objects from db

	ref: [python - Reload django object from database - Stack Overflow](https://stackoverflow.com/questions/4377861/reload-django-object-from-database)
	
	```
	        new_loc.refresh_from_db()
	```
* what does Q do ?
	[Making queries | Django documentation | Django](https://docs.djangoproject.com/en/3.2/topics/db/queries/#complex-lookups-with-q-objects)
	
	by default when you chain query set filter together, the conditions are AND together, Q object can do complex qu


	
### How to 
* how can we force a item assoicate with the creating user?

	* add creator in the models.py
	* in view, add a perform_create hook, 

	and invoke the serializer save function, passin the object

	```
	def perform_create(self, serializer): # new
			serializer.save(owner=self.request.user)
	```        



	* in serializer, 

	control whether it is read only by


	```
	class SnippetSerializer(serializers.ModelSerializer):
		author = serializers.ReadOnlyField(source='author.username')

	```

	* optional: create a two way serializer relashiping
	* 
* how to enable login and logout in rest framework?

	```
	urlpatterns = [
		path("admin/", admin.site.urls),
		path("api-auth/", include("rest_framework.urls")),
		path("api/v1/", include("blog.urls")),
	]

	```
* how to enable permissions for DRF?
* how to make a field not editable in rest?
	read only fields


	```
	from rest_framework import serializers
	from .models import Snippet

	class SnippetSerializer(serializers.ModelSerializer):

		class Meta:
			model = Snippet
			fields = '__all__'
			read_only_fields = ('owner',)

	```
* how to add user as a foreign key?

	* method one

	```
	from django.contrib.auth.models import User

	class Blog(models.Model):
		author = models.ForeignKey(User, on_delete=models.CASCADE)

	```
	* method two
	```
		owner = models.ForeignKey('auth.User', related_name='snippets', on_delete=models.CASCADE) # new
	```

	* the recommmneded way

	from [django doc](https://docs.djangoproject.com/en/3.0/topics/auth/customizing/#:~:text=Referencing%20the%20User%20model&text=Instead%20of%20referring%20to%20User,is%20specified%2C%20or%20User%20otherwise.)
	```
	from django.conf import settings
	from django.db import models

	class Article(models.Model):
		author = models.ForeignKey(
			settings.AUTH_USER_MODEL,
			on_delete=models.CASCADE,
		)

	```
* how to create a Listview?

	[django.views.generic.listview](https://github.com/django/django/blob/b9cf764be62e77b4777b3a75ec256f6209a57671/django/views/generic/list.py)
* how to enable cors in rest api?

	* pipenv install django-cors-headers==3.2.1

	add app to apps

	'corsheaders'

	midleware seection

	'django.contrib.sessions.middleware.SessionMiddleware',
		'corsheaders.middleware.CorsMiddleware',

	* add CORS orgin whitel list
	```
		CORS_ORIGIN_WHITELIST = (
			"http://localhost:3000",
			"http://localhost:8000",
		)
	```
* how to create a view for API?
	[very good doc](https://github.com/encode/django-rest-framework/blob/fccfdd21c078579bb0029db7289d5e19d58201e8/docs/api-guide/generic-views.md)
* how to move the template dir directory?

	PROJECT_PATH = os.path.realpath(os.path.dirname(__file__))

	TEMPLATES = [
		{
			"BACKEND": "django.template.backends.django.DjangoTemplates",
			"DIRS": [PROJECT_PATH + "/templates/"],

	all the .py is executable, you can print it
* how can you force evaluate a query set?

	```
	lst = list(queryset)
	```


	[* good reference](https://medium.com/better-programming/understanding-django-database-querysets-and-its-optimizations-1765cb9c36e5#:~:text=Django%20QuerySet%20class%20has%20a,_result_cache%20%2C%20which%20is%20a%20list.)
* how does server deditate the use of ahtormation method?

	WWW-Authenticate: basic/Token
* what's the different between null and blank?

	null is db related
	blank is validation related
* what is the steps to install a new django app?

	```
	pipenv install django==3.0.1
	pipenv shell
	django-admin startproject newspaper_project .

	```
* how to add a new app to django?
	edit root project settings.py
* what does reverse function do in django?
* whats the code path to render to power a page?
	-> urls.py(projects) -> urls.py(app) -> views.py -> models.py -> template
* what is the entry command for django?
	```
	djago-admin

	```
* how to avoid install django project and it creates a redundent project name?

	└── test_project
		├── manage.py
		└── test_project
			├── __init__.py
			├── settings.py
			├── urls.py
			└── wsgi.py

	```
	 django-admin startproject test_project .
	```
* how django define where to load templates ?

	in the templates dir under the app
* How to see the django query parameter
* how to run one test cases
	ref: [Writing and running tests | Django documentation | Django](https://docs.djangoproject.com/en/3.2/topics/testing/overview/)

	* method one
	folder structure
	urbanspring-tests-inegration-common
	```
	pipenv run python manage.py test urbanspring.tests.integration.common --keepdb --verbosity 2 --settings core.settings.testing
	```

	* method 2
	```
	python manage.py test --pattern='test_create_location.py'  --keepdb --verbosity 2 --settings core.settings.testing
	```
* how to test exception?
	ref: https://django.readthedocs.io/en/1.6.x/ref/exceptions.html#module-django.core.exceptions
	
	
	```
	from django.core.exceptions import ObjectDoesNotExist
	
	        with self.assertRaises(ObjectDoesNotExist):
            new_loc.refresh_from_db()
	```
* how to run custom django commands ?

	```
	python manage.py --help #you will see the custom cmands there
	```
### Resource
* good cheat sheet

	https://cheatography.com/lewiseason/cheat-sheets/django-models/



