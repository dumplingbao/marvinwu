---




Date: 2021-07-26

Topic:
-  til
-  serverless
Ref:
-

---




how to Passing secrets to your lambda

* using ssm

```
environment:
  EMAIL_ADDRESS: ${ssm:emailAddress-${opt:stage, self:provider.stage}~true}
  EMAIL_PASSWORD: ${ssm:emailPassword-${opt:stage, self:provider.stage}~true}
```

* use env variable:
	remeber to install serverless-dotenv-plugin, otherwise you need to define it:

	```
	  environment:
		DB_USER: ${env:DB_USER}
		DB_PASSWORD: ${env:DB_PASSWORD}
		DB_NAME: ${env:DB_NAME}
		DB_HOST: ${env:DB_HOST}
	```

	```
	  vpc:
	securityGroupIds:
	  - ${env:VPC_SECURITY_GROUP_ID}
	subnetIds:
	  - ${env:VPC_SUBNET_1}
	  - ${env:VPC_SUBNET_2}

	```
	



