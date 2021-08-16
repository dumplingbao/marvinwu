---




Date: 2021-07-29

Topic:
-  surveyl
-  django

Ref:
-

---




Survey django api key

* [Django REST Framework API Key](https://florimondmanca.github.io/djangorestframework-api-key/)

	read this first seems very good
	
	> Please note that this package is NOT meant for authentication. You should NOT use this package to identify individual users, either directly or indirectly.

	ref: [User Guide - Django REST Framework API Key](https://florimondmanca.github.io/djangorestframework-api-key/guide/)
	
	> API keys ≠ Security: depending on your situation, you should probably not use API keys only to authorize your clients.

	> Besides, you do NOT recommend using this package for authentication, i.e. retrieving user information from API keys.

	> ==Indeed, using API keys shifts the responsability of Information Security on your clients.== This induces risks, especially if detaining an API key gives access to confidential information or write operations. For example, an attacker could impersonate clients if they let their API keys leak.

	> : allow only those who require resources to access those specific resources. In other words: if your client needs to access an endpoint, ==add API permissions on that endpoint only instead of the whole API.==

* [Why and when to use API keys  |  Cloud Endpoints with OpenAPI](https://cloud.google.com/endpoints/docs/openapi/when-why-api-key#top_of_page)

	> ==API keys are for projects, authentication is for users

* [django-rest-framework - API-KEY base request authentication | django-rest-framework Tutorial](https://riptutorial.com/django-rest-framework/example/30993/api-key-base-request-authentication)

	a simple way of DIY api key??
	


