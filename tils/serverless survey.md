---

---

# [Running puppeteer and headless chrome on AWS lambda with Serverless – Nadeesha Cabral – Something something sell yourself here kinda thing. Also, 🥓 and 🍺.](https://nadeesha.github.io/headless-chrome-puppeteer-lambda-servelerless/)

# [Will it blend? Or how to run Google Chrome in AWS Lambda](https://medium.freecodecamp.org/will-it-blend-or-how-to-run-google-chrome-in-aws-lambda-2c960fee8b74)

* claudia with serverlesss

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

