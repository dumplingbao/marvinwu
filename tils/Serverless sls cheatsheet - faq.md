---




Topic:
-  Programming
-  Serverless and Lambdas
-  Lambda

Ref:
-  serverless survey

Date: 2021-01-21

---




- [[how to provide fix input to lambda functions using sls ?]]

- how to invoke sls command using a particular aws-profile?

	```
	sls deploy --aws-s3-accelerate --aws-profile xaff

	```

- how to create a new node sls package ?

	```

	sls create --template aws-python3 --name bottle-sync --path bottle-sync

	sls create --template aws-nodejs --path web-jq --aws-profile xaff


	```

- [[how to resolve parameter schedule expression is not valid?]]

- how to share code outside sls folder?

	```yml
	plugins:
	  - serverless-package-external

	custom:
	  packageExternal:
		external:
		  - '../lib'

	```

- how to use lambday layer ?

- how to get around of python dockerize true?

	ref: https://github.com/UnitedIncome/serverless-python-requirements/issues/106

-  how to check sls envirable

	ref https://forum.serverless.com/t/passing-boolean-values-from-cli-into-serverless-yml/1997/6
	
	```
	$ sls --state dev print
	```

-  how to give s3 access to lambda?

	```
	  name: aws
	  runtime: python3.6
	  stage: ${env:STAGE, 'prod'}
	  timeout: 600
	  region: ${env:AWSREGION}
	  iamRoleStatements:
		  - Effect: "Allow"
			Action:
			  - "s3:*"
			Resource:
			  - "arn:aws:s3:::*/*"
	```

	```
	provider:
		name: aws
		timeout: 10
		runtime: provided
		iamRoleStatements:
			# Allow to put a file in the `my-bucket` S3 bucket
			-   Effect: Allow
				Action: s3:PutObject
				Resource: 'arn:aws:s3:::my-bucket/*'
			# Allow to query and update the `example` DynamoDB table
	```

- [[how to Passing secrets to your lambda]]
		
-  sls life cycle command

	- create
	  sls create --template aws-nodejs --path myService

	- deploy
	  sls deploy --aws-s3-accelerate

	- install from remote github

	serverless install --url https://github.com/serverless/examples/tree/master/aws-node-puppeteer --name chromeLambda

	- remove
	  sls remove

	- invoke
	  sls invoke --function processSqs

	- tail
	  sls logs -f myFuncName -t

	[examples/aws-node-puppeteer at master · serverless/examples](https://github.com/serverless/examples/tree/master/aws-node-puppeteer)

- how to setup dead letter queue ? and why do i need it ?
	a good turorial [here](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-configure-dead-letter-queue.html)

* how can i pass parameter between lambdas

> Any Lambda function invoked asynchronously is retried twice before the event is discarded.

-  structure of amazon (event,context) paramter

	event: {
		body,
		queryStringParameters
		}
-  how to get url paramter in lambda ??

	```

	const {
	url
	} = event.queryStringParameters

	```
-  how to add s3 permission in serverlesss yaml ?

	```yml

	provider:
	...
	iamRoleStatements: - Effect: "Allow"
	Action: - "s3:_"
	Resource: { "Fn::Join": ["", ["arn:aws:s3:::BUCKET_NAME", "/_" ] ] }

	```


* why api gateway call return 'Internal server error'

	probably you forgot to:
		* return statusCode 200 
		* stringify the body ?

	```

	return {
	statusCode: 200,
	body: JSON.stringify(result)
	}

	```

* why lambda is not logging to the cloudwatch ?

	check your lambda function persimssion, whether it has permission to write to cloudwatch
* why do i get this error ?
	```
	aws-sdk/lib/request.js:31
				throw err;
				^

	ReferenceError: navigator is not defined
	```

need to uncheck remember user device in cognito user pool

* mapping template ?
https://auth0.com/blog/building-serverless-apps-with-aws-lambda/

* why some event has body but some doesnt ?

* no mapping template function ? in api gateway ?

	need to uncheck lambda proxy integraiton

* [[How do i set permission for using x]]
* how to make serverless run local
dont do it

* [[how to integrate it with jenkins integration]]



