---




Date: 2021-07-26

Topic:
-  til
-  serverless
Ref:
-

---




How do i set permission for using x ?

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
			
			
-  how to add sqs permssion in serverless yml ?

```yml

iamRoleStatements: 
	- Effect: Allow
Action: 
	- sqs:SendMessage 
	- sqs:DeleteMessage 
	- sqs:ReceiveMessage
Resource: arn:aws:sqs:us-east-1:somenumber:downloadTask

```


