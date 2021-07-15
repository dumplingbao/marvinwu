---

Topic:
-  Programming
-  Serverless and Lambdas
-  Lambda
Date: 2021-01-21
---


- how to provide fix input to lambda functions using sls ?

	you can provide a fixed input to serverless function via schedule, cloudwatch event and event bridge:

	Ref: [Description of 'input', 'inputPath', and 'stageParams' in schedule event (for AWS) - Serverless Framework - Serverless Forums](https://forum.serverless.com/t/description-of-input-inputpath-and-stageparams-in-schedule-event-for-aws/4323/4)

	> input and inputPath map to AWS constructs 293; stageParams is just a sub-item of input and appears to be a made up name, showing that you can nest things under input

	```
	# serverless.yml
	query_alert_handler:
    handler: handler.query_alert_handler
    events:
      - schedule:
          rate: rate(1 minute)
          enabled: true
          input:
            alert_code: "SC_101"
            threshold_count: 4
            lookback_hours: 24
	
	```

	 the pass in parameter will appears in the event input
	 
	 ```
	 
    logger.info(json.dumps(event, indent=4, sort_keys=True, default=str))
	2021-07-13 11:53:27.660 (+08:00)        75b9ce69-84c7-4bcf-b446-531ffe86169d    [INFO]  {
    "alert_code": "SC_101",
    "lookback_hours": 24,
    "threshold_count": 4
}
	 ```
	 
	 and you can mock the trigger by
	 
	 ```
	 sls invoke -f function_name --path mock_input_json_path
	 ```
- how to invoke sls command using a particular aws-profile?

```
sls deploy --aws-s3-accelerate --aws-profile xaff

```

- how to create a new node sls package ?

```

sls create --template aws-python3 --name bottle-sync --path bottle-sync

sls create --template aws-nodejs --path web-jq --aws-profile xaff


```

- how to share code outside sls folder?

```
plugins:
  - serverless-package-external

custom:
  packageExternal:
    external:
      - '../lib'



```


- how to use lambday layer ?
-

- how to get around of python dockerize true?

https://github.com/UnitedIncome/serverless-python-requirements/issues/106

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

# how to Passing secrets to your lambda

ssm

```
environment:
  EMAIL_ADDRESS: ${ssm:emailAddress-${opt:stage, self:provider.stage}~true}
  EMAIL_PASSWORD: ${ssm:emailPassword-${opt:stage, self:provider.stage}~true}
```

### life cycle command

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

- serverless install --url https://github.com/serverless/examples/tree/master/aws-node-puppeteer --name chromeLambda

if need to export multiple functions, make sure to split into different files

````

service: chromeLambda
provider:
  name: aws
  runtime: nodejs8.10

plugins:
  - serverless-plugin-chrome

package:
  exclude:
    - node_modules/puppeteer/.local-chromium/**

functions:
  hello:
    handler: handler.hello
    memorySize: 1536MB
    timeout: 60
    events:
      - http:
          path: /
          method: get
  parse:
    handler: parser.parse
    memorySize: 1536MB
    timeout: 60



    ```

* how to test locally
*
````

const {parse} = require('./parser');

(async () => {
let output = await parse('../../sampleData/postfun-1.html')
console.log(output)
})()

```








# [Running puppeteer and headless chrome on AWS lambda with Serverless – Nadeesha Cabral – Something something sell yourself here kinda thing. Also, 🥓 and 🍺.](https://nadeesha.github.io/headless-chrome-puppeteer-lambda-servelerless/)

# [Will it blend? Or how to run Google Chrome in AWS Lambda](https://medium.freecodecamp.org/will-it-blend-or-how-to-run-google-chrome-in-aws-lambda-2c960fee8b74)

* claudia with serverlesss
*

# lambda with pupetter


# aws lambda step function





# [Passing data between Lambdas with AWS Step Functions](https://medium.com/@tturnbull/passing-data-between-lambdas-with-aws-step-functions-6f8d45f717c3)

* explains how lambda parameter work
* explains how step function work
* event size limit ?

same as sqs, 256 kb


# [Lessons from building a Serverless Data Pipeline with AWS Kinesis and Lambda](https://read.iopipe.com/lessons-from-building-a-serverless-data-pipeline-with-aws-kinesis-and-lambda-4d8cf0ebcbc9)

* kinesis with lambda

# [AWS Lambda — should you have few monolithic functions or many single-purposed functions?](https://hackernoon.com/aws-lambda-should-you-have-few-monolithic-functions-or-many-single-purposed-functions-8c3872d4338f)

* should use manuy single purpose function





# enviroment variable

* [serverless enviroemnt variable](https://serverless-stack.com/chapters/serverless-environment-variables.html)

# [how to use gitlab ci with serverless](https://medium.com/@tarekbecker/a-production-grade-ci-cd-pipeline-for-serverless-applications-888668bcfe04)


# [I wish I knew how to use MongoDB connection in AWS Lambda](https://blog.cloudboost.io/i-wish-i-knew-how-to-use-mongodb-connection-in-aws-lambda-f91cd2694ae5)

# [best practice](https://docs.atlas.mongodb.com/best-practices-connecting-to-aws-lambda/)

# [Lessons Learned — A Year Of Going “Fully Serverless” In Production](https://hackernoon.com/lessons-learned-a-year-of-going-fully-serverless-in-production-3d7e0d72213f)


# [sns serverless tutorial](https://dev.to/adnanrahic/a-crash-course-on-serverless-with-awstriggering-lambda-with-sns-messaging-30nf)




dos:

* use static site
* api server on serverless
*

dont

* dont do local testing

* background jobs using apex
*

# [integration s3 with lambda](https://www.lambdatv.com/integrating-s3-with-lambda)

* Things to keep in mind
S3 sends event directly to 1 target. Use the other integrations (SNS or SQS) to run multiple functions or even have one function that fans out to other functions.

* Events are not fired for failed operations. So if an upload to S3 failed, the trigger won’t occur.

* There are certain rules to follow while filtering for objects, e.g you can’t have overlapping filtering rules targeting different functions on a bucket. Check the documentation for the rules.

* Beware of recursion! If your target function creates a file in the same bucket, then this file will trigger the function again which will cause an infinite loop (and a huge AWS bill!)


# [Serverless: A lesson learned. The hard way](https://sourcebox.be/blog/2017/08/07/serverless-a-lesson-learned-the-hard-way/)

* be very careful with event trigger lambda, if recursive it could become very costly


# [Using SQS with AWS Lambda and Serverless](https://serverless.com/blog/aws-lambda-sqs-serverless-integration/)

* 3 ways to trigger lambda
    * api gateway
    * s3 triggers
    * sqs trigger
* good sqs design to plan for resilency
    * idempotent
    * batchsize should be set to one
    * Calling the DeleteMessage API manually within your function after successfully processing a message.
* concurrency control
```

# serverless.yml

functions:
hello:
handler: handler.hello
reservedConcurrency: 10 <-- Concurrency control
events: # Provide the ARN of your queue - sqs: arn:aws:sqs:us-east-1:123456789012:queue1

```

# [3 Steps To Faster Serverless Development](https://serverless.com/blog/quick-tips-for-faster-serverless-development/)

* sls deploy function -f myFuncName
* sls deploy --aws-s3-accelerate

    or both
    sls deploy --function processSq --aws-s3-accelerate


* sls logs -f myFuncName -t
* Offline Emulation






# [SQS as an event source to trigger Lambda](https://medium.com/slalom-technology/sqs-as-an-event-source-to-trigger-lambda-8858cb3f627f)

# how to mange secrets ?

# how to invoke lambda locally ?


serverless invoke local --function translate --data '{"html":"<html>\n<title>\n</title>\n\n<body>\n    hello world\n</body>\n</script>\n\n</html>","languageCode":"en"}'




https://serverless.com/blog/serverless-secrets-api-keys/



# Q

* how to setup dead letter queue ? and why do i need it ?

a good turorial [here](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-configure-dead-letter-queue.html)


* how can i pass parameter between lambdas
*


> Any Lambda function invoked asynchronously is retried twice before the event is discarded.




* structure of amazon (event,context) paramter

event: {
    body,
    queryStringParameters
    }
* how to get url paramter in lambda ??

```

const {
url
} = event.queryStringParameters

```
* how to add s3 permission in serverlesss yaml ?


```

provider:
...
iamRoleStatements: - Effect: "Allow"
Action: - "s3:_"
Resource: { "Fn::Join": ["", ["arn:aws:s3:::BUCKET_NAME", "/_" ] ] }

```

* how to add sqs permssion in serverless yml ?


```

iamRoleStatements: - Effect: Allow
Action: - sqs:SendMessage - sqs:DeleteMessage - sqs:ReceiveMessage
Resource: arn:aws:sqs:us-east-1:743041884149:downloadTask

```




* why api gateway call return 'Internal server error'
probably you forgot to return statusCode 200 or stringify the body ?

```

return {
statusCode: 200,
body: JSON.stringify(result)
}

```








* why lambda is not logging to the cloudwatch ?


check your lambda function persimssion, whether it has permission to write to cloudwatch


* /Users/marvinwu/staging/codes/cognito-serverless/node_modules/aws-sdk/lib/request.js:31
            throw err;
            ^

ReferenceError: navigator is not defined


need to uncheck remember user device in cognito user pool



* mapping template ?
https://auth0.com/blog/building-serverless-apps-with-aws-lambda/

* why some event has body but some doesnt ?

* no mapping template function ? in api gateway ?

need to uncheck lambda proxy integraiton





security CORS:
api gateway

auth token



https://serverless.com/blog/abcs-of-iam-permissions/


serviceless permission tempalte:

dynamodb:

provider:
  name: aws
  runtime: nodejs8.10
  iamRoleStatements:
    - Effect: "Allow"
      Action:
       - dynamodb:Query
       - dynamodb:Scan
       - dynamodb:GetItem
       - dynamodb:PutItem
       - dynamodb:UpdateItem
       - dynamodb:DeleteItem
      Resource: "arn:aws:dynamodb:us-east-1:743041884149:table/movies2"


invoke other lambda

  iamRoleStatements:
    - Effect: Allow
      Action:
        - lambda:InvokeFunction
        - lambda:InvokeAsync
      Resource: "*"

s3:

provider:
  name: aws
  runtime: nodejs4.3
  iamRoleStatements:
    - Effect: "Allow"
      Action:
        - "s3:*"
      Resource: "arn:aws:s3:::slsupload/*"

resources:
  Resources:
    UploadBucket:
      Type: AWS::S3::Bucket
      Properties:
        BucketName: slsupload
        AccessControl: PublicRead
        CorsConfiguration:
          CorsRules:
          - AllowedMethods:
            - GET
            - PUT
            - POST
            - HEAD
            AllowedOrigins:
            - "*"
            AllowedHeaders:
            - "*"






# hello world

serverless create --template aws-nodejs --path my-test-service

serverless deploy
serverless invoke --function hello


# how to make serverless run local

npm install serverless-offline --save-dev

* serverless.yml

* adding these two lines
plugins:
  - serverless-offline

serverless offline start


arn:aws:sns:us-east-1:743041884149:sns-test

# sns


https://hackernoon.com/a-crash-course-on-serverless-with-node-js-632b37d58b44


# how to make function calls between lambda:

method 1:

lambda subscribe to a sns topic:
post sns to trigger lambda:

to test locally:

npm install serverless-offline-sns


* serverless.yaml

```

service: my-sns-testservice

provider:
name: aws
runtime: nodejs8.10

functions:
hello:
handler: handler.hello
events: # uncomment these lines - sns:
arn: "arn:aws:sns:us-east-1:123456789012:test-topic" - http:
path: hello/get
method: get
plugins:

- serverless-offline
- serverless-plugin-external-sns-events
- serverless-offline-sns
  custom:
  serverless-offline-sns:
  port: 4500 # a free port for the sns server to run on
  debug: false

```

```

var AWS = require('aws-sdk')

var sns = new AWS.SNS({
endpoint: 'http://127.0.0.1:4500',
region: 'us-east-1'
})

function ping(message){
sns.publish({
Message: message,
MessageStructure: 'json',
TopicArn: 'arn:aws:sns:us-east-1:123456789012:test-topic'
}, () => {
console.log('ping')
})
}

ping('hellooooooooooooooooooooooooooooooooooo')

var params = {
Protocol: 'http', /_ required _/
TopicArn: 'arn:aws:sns:us-east-1:012456789012:test-topicchain',
Endpoint: 'http://127.0.0.1:8080'
};

sns.subscribe(params, function(err, data) {
if (err){
console.log('error\***\*\*\*\*\***')
console.log(err, err.stack);
}
console.log('dataa**\*\***\*\***\*\***')
console.log(data);
});

var http = require('http');

http.createServer(function (req, res) {
req.on('data', (d)=> {
console.log(d.toString())
})
}).listen(8080);

```


# method 2: lambda direct invoke

* serverless yaml
provider:
  name: aws
  runtime: nodejs8.10
  iamRoleStatements:
      - Effect: Allow
        Action:
          - lambda:InvokeFunction
          - lambda:InvokeAsync
        Resource: "*"

* in lamdba function


```

var AWS = require('aws-sdk') // must be npm installed to use
var lambda = new AWS.Lambda()

module.exports.hello = (event, context, callback) => {
const response = {
statusCode: 200,
body: JSON.stringify({
message: 'Go Serverless v1.0! Your function executed successfully!',
input: event
})
}

console.log(' i am here')
var params = {
FunctionName: 'testchain-dev-testchain', // the lambda function we are going to invoke
InvocationType: 'RequestResponse',
LogType: 'Tail',
Payload: '{ "name" : "Alex" }'
}

lambda.invoke(params, function (err, data) {
if (err) {
context.fail(err)
} else {
context.succeed('Lambda_B said ' + data.Payload)
}
console.log('done calling helloChain')
callback(null, response)
})

console.log('i am done')
// Use this code if you don't use the http event with the LAMBDA-PROXY integration
// callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
}

```
good tutorial:


https://medium.freecodecamp.org/how-to-build-a-serverless-url-shortener-using-aws-lambda-and-s3-4fbdf70cbf5c


https://hackernoon.com/introducing-formplug-v1-a-form-forwarding-service-for-aws-lambda-2c125dfe608e



erros:


502?

forgot to json stringify reply ?




how to manage security ?


https://serverless.com/blog/abcs-of-iam-permissions/




  iamRoleStatements:
    - Effect: "Allow"
      Action:
       - dynamodb:Query
       - dynamodb:Scan
       - dynamodb:GetItem
       - dynamodb:PutItem
       - dynamodb:UpdateItem
       - dynamodb:DeleteItem
      Resource: "arn:aws:dynamodb:us-west-2:111110002222:table/my-new-table"

Pro-tip: You can use CloudFormation Intrinsic Functions to make it easier to refer to specific resources. For example, if you've created your DynamoDB table in the resources section of your serverless.yml, you can use the Fn::GetAtt intrinsic function to get the ARN:





why i am getting interal server error but cloud watch display sucessfull and test is okay ?

because return is without 200 okay ?



# how to create serverless function template

* sls create --template aws-nodejs --path snsTest
* sls deploy
* sls invoke -f hello


# how to speed up serverless

* sls deploy --function hello



# measurement

https://dbader.org/blog/monitoring-your-nodejs-app-with-datadog


# jenkins integration


```

pipeline {
agent any
stages {
stage('Unit test') {
steps {
sh 'serverless --help' // to ensure it is installed
}
}
stage('Integration test') {
steps {
sh 'serverless deploy --stage dev'
sh 'serverless invoke --stage dev --function hello'
}
}
stage('Production') {
when {
env.BRANCH_NAME == 'master'
}
steps {
parallel (
'us-east-1' : {
sh 'serverless deploy --stage production --region us-east-1'  
 sh 'serverless invoke --stage production --region us-east-1 --function hello'
},
'ap-southeast-2' : {
sh 'serverless deploy --stage production --region ap-southeast-2'  
 sh 'serverless invoke --stage production --region ap-southeast-2 --function hello'  
 }

)
}
}
stage('Teardown') {
steps {
echo 'No need for DEV environment now, tear it down'
sh 'serverless remove --stage dev'
}
}
}
environment {
AWS_ACCESS_KEY_ID = credentials('AWS_ACCESS_KEY_ID')
AWS_SECRET_ACCESS_KEY = credentials('AWS_SECRET_ACCESS_KEY')
}

}




