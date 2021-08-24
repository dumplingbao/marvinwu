---

Status: 
Date: 2021-08-18
Topic:
-  Django

Ref:
-

---

* [What the hell is WSGI anyway and what do you eat it with?](https://rahmonov.me/posts/what-the-hell-is-wsgi-anyway-and-what-do-you-eat-it-with/)

	* What does it do: WSGI gateway and your software
	
		> You sit around and wait patiently for a request from some kind of a client
			* When a client comes to you with a request, you receive this request
			* Then, you take this request to a guy called PythonApp and say to him: "Hey dude, wake up! Here is a request from a very important client. Please, do something about it"
			* You get a response from this PythonApp guy
			* You then take this response back to your client

		> PythonApp guy is your software (duh!). ==Whereas a web server should exist and wait for an incoming request all the time, your software exists only at the execution time==:
			* A web server wakes it up and gives him the request
			* It takes the request and executes some commands on it
			* It returns a response to the web server
			* It goes to sleep
			Web server takes this response back to his client
			The only thing it does is execute, not sit around and wait.

	* Why we need WSGI
	
		> What this means is that,==in the past you had to adapt your software to fit the requirements of a web server. Moreover, you had to write different kinds of wrappers in order to make it suitable across different web servers==. What developer wants to deal with such things instead of writing code?


	* The spec

	> the application interface is implemented as a callable object such as a function, a method, a class or an instance with a __call__ method. This object should accept two positional arguments and return the response body as strings in an iterable.
	   The two arguments are:
		==a dictionary with environment variables==
		==a callback function that will be used to send HTTP status and HTTP headers to the server==

		```
		def application(environ, start_response):
		```

	* Middleware
	> With middleware, the above scenario will look like this:
		* Web server gets a request
		* Now, it won't directly talk to the PythonApp guy. It will send it through a postman (middleware)
		* The postman delivers the request to the PythonApp guy
		* After the PythonApp guy does his job, gives the response to the postman
		The postman delivers the response to the web server



* [What is WSGI (Web Server Gateway Interface)? | by Positive Stud | Analytics Vidhya | Medium](https://medium.com/analytics-vidhya/what-is-wsgi-web-server-gateway-interface-ed2d290449e)

	> ==Why use the WSGI rather than directly pointing the web server to the Django or Flask application?==
	If you directly point your web server to your application, ==it reduces the flexibility of your application. Since your web server now directly points to your web application, you are unable to swap out web stack components. ==
	Now, let’s have a look at an example to make you clear about the applicability of WSGI. For instance, today you have decided to deploy your application using Gunicorn but after some years you decide to switch from Gunicorn to mod_wsgi. Now, in this case, you can easily switch to mod_wsgi without making any changes in the application or framework that implements WSGI. 
	Hence, WSGI provides flexibility to your application.
	Another reason for using ==WSGI is due to its scalability==. Once your application is live, up and running there can be thousands of requests in your application. Hence, WSGI is capable of serving thousands of requests at a time. As we know, the WSGI server is responsible for handling the requests from the web server and takes decision for carrying out the communication of those requests to an application framework’s process. Here, we can divide the responsibilities among the servers for scaling web traffic.

	why use it, beccause for decoupling and performance
	
	
	
* [WSGI: Server Interface for Python | Toptal](https://www.toptal.com/python/pythons-wsgi-server-application-interface)


	![[Pasted image 20210818114334.png]]
	
	
	
* [What is WSGI and Why Do You Need Gunicorn and Nginx in Django – apirobot](https://apirobot.me/posts/what-is-wsgi-and-why-do-you-need-gunicorn-and-nginx-in-django)

	> Here’s how Nginx, Gunicorn, and Django work together. If the browser wants dynamically generated content like an HTML page, then, in that case, Nginx will pass the request to Gunicorn and Django because Django is responsible for generating HTML pages. And, when the job is done, when Django generated a page, Gunicorn will send this HTML page to Nginx, and Nginx will send this page back to the browser.

	> However, you don’t need to pass the request to Gunicorn all the time. For example, if the browser wants static or media files, then there is no need to pass this request to Gunicorn. Nginx can directly serve these files to the browser.
	
	
* [How a request becomes a response: Diving deeper into WSGI – Django Deconstructed](https://djangodeconstructed.com/2018/02/15/how-a-request-becomes-a-response-diving-deeper-into-wsgi/)

	read
	
* [Why ASGI is Replacing WSGI in Django - Reading Time: 3 Mins - MaxOngZB](https://www.maxongzb.com/why-asgi-is-replacing-wsgi-in-django-reading-time-3-mins/)

	> In the use of async & await capabilities, web sockets and http/2 to make it faster and to remain relevant as the backend of choice for Django moving forward.
	

* [Settings — Gunicorn 20.1.0 documentation](https://docs.gunicorn.org/en/stable/settings.html)
	
	> workers
	Command line: -w INT or --workers INT

	Default: 1

	The number of worker processes for handling requests.

	A positive integer generally in the ==2-4 x $(NUM_CORES) range==. You’ll want to vary this a bit to find the best for your particular application’s work load.


	> timeout
	Command line: -t INT or --timeout INT

	Default: 30

	> Workers silent for more ==than this many seconds are killed and restarted==.

	==Value is a positive number or 0. Setting it to 0 has the effect of infinite timeouts by disabling timeouts for all workers entirely.==

	Generally, the default of thirty seconds should suffice. Only set this noticeably higher if you’re sure of the repercussions for sync workers. For the non sync workers it just means that the worker process is still communicating and is not tied to the length of time required to handle a single request.


* [Gunicorn worker timeout error - Stack Overflow](https://stackoverflow.com/questions/10855197/gunicorn-worker-timeout-error)

	good try it out
	
	> --log-level debug
	> --timeout 90





