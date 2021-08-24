---

Date: 2021-07-26

Topic:
-  til
-  nextjs
Ref:
-

---

* How to star server at another port?

```
npm run dev -p 8080
```

* How to change api path?

* how to set cookie in API endpoint?

```js
import { serialize } from 'cookie'

res.setHeader('Set-Cookie', serialize('_session', sessionCookie, { path: '/',domain: 'localhost.com'  }));


```

* what's the differentce bteween res.end() and res.send?
	
	res.send is the properway to send something to client, with status code.
	
	res.end just end the conversation
	
* How to clear cookie?





