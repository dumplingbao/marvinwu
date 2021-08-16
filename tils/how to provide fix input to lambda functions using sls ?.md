---




Date: 2021-07-26

Topic:
-  til
-  serverless
Ref:


---




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
 
 
 

