---

Date: 2021-06-23

Topic:
-  serverless
-  AWS SNS FAQ
Ref:


---

* Difference between SNS and SQS ?
	ref: [AWS — Difference between SQS and SNS | by Ashish Patel | Awesome Cloud | Medium](https://medium.com/awesome-cloud/aws-difference-between-sqs-and-sns-61a397bf76c5)
	
	SQS:
		* sub pull from queue, not push
		* one message gos to one sub
		* message stay in queue
	
	SNS:
		* msg push to the sub
		* many sub can receive same message at the same time
		* if no sub is listening, the message is lost


* How to use attribute to filter sns triggers?

sender
```python
 response = client.publish(
        TargetArn="arn:aws:sns:us-west-2:783487922577:system_event_dispatch",
        Message=json.dumps(
            {
                "default": json.dumps(message),
            }
        ),
        Subject="system messsage",
        MessageStructure="json",
        MessageAttributes={
                        'foo': {
                            'DataType': 'String',
                            'StringValue': 'test'
                        }
                    },
    )

```

serverless.yml

```yml
functions:
  hello:
    handler: handler.hello
    events:
      - sns: 
          topicName: system_event_dispatch
          displayName: System event to alerts pipeline
          filterPolicy:
            foo:
              - dog
              - bar

```

* why do i get target arn not found error ?

```
    raise error_class(parsed_response, operation_name)
botocore.errorfactory.InvalidParameterException: An error occurred (InvalidParameter) when calling the Publish operation: Invalid parameter: TargetArn
```

one of the reason could be when you initize the boto3 client, the region is different from the sns region




