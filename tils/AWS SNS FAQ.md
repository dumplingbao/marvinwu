---

---

* Does SNS has a region ? 
yes it does has an region, subsriber seems needs to be in the same region of the sns, but pub can send across region ?


* how to grant sls right to invoke sns ?

Ref: https://hackernoon.com/a-crash-course-on-serverless-with-aws-triggering-lambda-with-sns-messaging-bc17d9f81ca2

```yml
# serverless.yaml

provider:
  name: aws
  runtime: python3.6
  stage: ${env:STAGE, 'test'}
  timeout: 600
  region: ${env:AWSREGION}  
  iamRoleStatements:
    - Effect: "Allow"
      Resource: "*"
      Action:
        - "sns:*"


```

* how to use aws cli to publish a json payload to a topic?

```
aws sns publish --topic-arn your-topic-arn      --message '{"key1":"value1", "key2":"value2"}'
```

* can i check the previous message sent to the topic ?

