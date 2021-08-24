---

Date: 2021-07-26

Topic:
-  til
-  serverless
Ref:
- https://hackernoon.com/introducing-formplug-v1-a-form-forwarding-service-for-aws-lambda-2c125dfe608e
- https://medium.freecodecamp.org/how-to-build-a-serverless-url-shortener-using-aws-lambda-and-s3-4fbdf70cbf5c


---

how to make function calls between lambda:

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

