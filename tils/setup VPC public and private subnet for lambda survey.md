---

Date: 2021-07-06

Topic:
-  Programming
-  serverless

Ref:


---

* How to enable lambda to send sns in a private VPC using interface endpoint ?

VPC -> Endpoints -> create endpoint

![[Pasted image 20210706163914.png]]

choose the service and attach to the vpc, thats it.

### Surveys


* [Three ways to use AWS services from a Lambda in a VPC](https://www.alexdebrie.com/posts/aws-lambda-vpc/)
	
	[[DynamoDB]]
	
	in depth and comprehensive overview of AWS and lambdas networking


	|                  Method                  |                                              Works for                                               |                                  Cost                                  |
	|------------------------------------------|------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------|
	|               NAT Gateway                |                               - Any AWS service or third-party service                               |         - $0.045/hr (~$33.50 monthly)  - $0.045/GB processing          |
	|           VPC gateway endpoint           |                                    - Amazon S3 - Amazon DynamoDB                                     |                                  None                                  |
	|          VPC interface endpoint          |   - 66 different AWS services , including Amazon CloudWatch, Kinesis Firehose, SNS, SQS, and SSM.    | - $0.01/hr per endpoint per AZ (~$7.45 monthly)  - $0.01/GB processing |
	| Amazon CloudWatch Embedded Metric Format |                                       - Amazon CloudWatch only                                       |                                  None                                  |
	|           Lambda Destinations            | - Amazon SNS - Amazon SQS - Amazon EventBridge  But: only for asynchronous Lambda invocation results |                                  None                                  |


	> But even a single endpoint like this can be a pain if you’re using a service like Amazon CloudWatch Metrics to store metrics about your function’s execution. ==Like other AWS services, the CloudWatch Metrics API is a public API that requires public internet access== to publish metric data from your Lambda function.
	> Use tools like CloudWatch Metric’s Embedded Metric Format or Lambda Destinations to interact with services

	* > Give your Lambda function public internet access with a NAT Gateway

	why need nat gateway ? can't use igw and public ip ?

	[[Serverless sls cheatsheet]] VPC networking example
	ref: [serverless-vpc-examples/nat-gateway at master · alexdebrie/serverless-vpc-examples](https://github.com/alexdebrie/serverless-vpc-examples/tree/master/nat-gateway)  #🚧  try it 

	* > Create a VPC endpoint for your desired service
	
		> The second approach to using AWS services from a Lambda in a VPC is to set up a VPC endpoint in your VPC. VPC endpoints allow communication with AWS services from your VPC without requiring access to the public internet. Traffic to the configured service will be routed through the endpoint directly to the service without hitting the public internet.

		> There are two types of VPC endpoints: interface endpoints and gateway endpoints. 

		* > Gateway endpoints are simply a route in your subnet’s route table that directs traffic directly to the given service. Gateway endpoints are great because they don’t cost you anything to run. Unfortunately, ==gateway endpoints are only supported for Amazon S3 and DynamoDB==. If you want other services, you’re out of luck.

		* > Interface endpoints support a much broader menu of services, including Amazon CloudWatch, Amazon SNS, Amazon SQS, and Amazon Kinesis. Interface endpoints use AWS PrivateLink to route your network traffic to the given service. Unfortunately,==interface endpoints do have an associated cost== — $0.01 per hour per endpoint per AZ (~$7.50 per month)
			[[Serverless sls cheatsheet]] ref: https://github.com/alexdebrie/serverless-vpc-examples/tree/master/vpc-endpoint

			The ==PrivateDnsEnabled property configures private DNS in our VPC for the public DNS name to route to the private IP addresses for the service==. In our situation, this means sns.us-east-1.amazonaws.com will route to our VPC endpoint.

	* > Service-specific ways of communication within a VPC

		* > Using the Embedded Metric Format to log metrics to CloudWatch
		* > Using Lambda Destinations to send payloads to SQS, SNS, or EventBridge.

			![[Pasted image 20210706105858.png]]
			> With Lambda functions, you often are transforming and enriching some data, then sending it into another system like SQS, SNS, or EventBridge for processing. This process involves adding the AWS SDK into your Lambda function package, calling the proper service, and handling failure scenarios.
			
			> There are some limitations around Lambda Destinations — 
				* > they only work for asynchronous invocations, 
				* you can only send to a few AWS services, 
				* and it can only be used with messages that are sent at the end of your function invocation. Further, the wonderful crew at Trek10 has written up some surprising edges around Lambda Destinations. 
					Ref: [Lambda Destinations: What We Learned the Hard Way | Trek10](https://www.trek10.com/blog/lambda-destinations-what-we-learned-the-hard-way/)


* [Why my Lambda cannot access Internet anymore from its AWS VPC? | Theodo](https://blog.theodo.com/2020/01/internet-access-to-lambda-in-vpc/)

	good detailed walk throught to add Nat gateway to VPC


	> If a VPC doesn't have an Internet Gateway, then the resources cannot be accessed from the Internet. Conversely, resources within your VPC need an Internet Gateway to access the Internet.

	* create two subnet in the subnet
	* create internet gateway, attach it to the VPC
	* create NAT gateway
		 * assign it to the subnet you want to be public
	* create a public routing table, add default route to IGW in the public subnet
		![[Pasted image 20210707142355.png]]
	* create a private routing table, add default route to NAT in the private subnet
		![[Pasted image 20210707142301.png]]
	* put lamba in the private subnet
	
	
* [AWS Lambda: Enable Outgoing Internet Access within VPC | by Philipp Holly | Medium](https://medium.com/@philippholly/aws-lambda-enable-outgoing-internet-access-within-vpc-8dd250e11e12)

read it first

* [lambda inside VPC with internet access | by Asaf Adar | Analytics Vidhya | Medium](https://medium.com/analytics-vidhya/vpc-lambda-internet-access-f70a55dc7a39)

read it first

* [Give Internet Access to a Lambda Function in a VPC](https://aws.amazon.com/premiumsupport/knowledge-center/internet-access-lambda-function/)

official guide from aws

> Note: ==Whether a subnet is private or public depends on its route table. A public subnet has a route pointing to an internet gateway, and a private subnet does not.==

> ==To grant internet access to your function, its associated VPC must have a NAT gateway (or NAT instance) in a public subnet.==



* [Configure VPC Subnet Allocation of Public IP Addresses (AWS) | Iguazio](https://www.iguazio.com/docs/v2.10/intro/setup/cloud/aws/howto/subnet-public-ips-alloc-cfg/)

skim, and check why it is not assigning public ip



