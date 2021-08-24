---

Date: 2021-07-26

Topic:
-  serverless
-  til
Ref:


---


For the following cron

```yml
          rate: cron(0,30 * * * * *)
```

it throws an error
```
An error occurred: QueryUnderscorealertUnderscorescUnderscore101EventsRuleSchedule1 - Parameter ScheduleExpression is not valid. (Service: AmazonCloudWatchEvents; Status Code: 400; Error Code: ValidationException; Request ID; Proxy: null).
```

ref: [cron - Parameter ScheduleExpression is not valid - Stack Overflow](https://stackoverflow.com/questions/39482314/parameter-scheduleexpression-is-not-valid)

turns out it was caused by this:

> You cannot use * in both the Day-of-month and Day-of-week fields. If you use it in one, you must use ? in the other.

change to this: resolve the problem

```yml
      - schedule:
          rate: cron(0,30 * * * ? *)```



