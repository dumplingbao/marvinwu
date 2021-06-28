---

Date: 2021-06-23

Topic:
-  Programming
-  serverless
-  AWS SNS FAQ
Ref:


---

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

