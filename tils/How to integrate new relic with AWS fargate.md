---




Date: 2021-05-17
Ref:

Topic:
-  new relic
-  fargate



---







how to side car an app ?



Steps:

* follow the install with automatic script part [Install the ECS integration | New Relic Documentation](https://docs.newrelic.com/docs/integrations/elastic-container-service-integration/installation/install-ecs-integration/)

   remember to check the region and endpoints
   
```bash
     $ aws configure get region
		  us-east-1

		Executing the installer with the default values creates the following AWS
		resources:

		  - Systems Manager (SSM) parameter "/newrelic-infra/ecs/license-key". (Fargate and EC2 launch types)

		  - IAM policy "NewRelicSSMLicenseKeyReadAccess" which enables access to the
			SSM parameter with the license key. (Fargate and EC2 launch types)

		  - IAM role "NewRelicECSTaskExecutionRole" to be used as the task execution role
			https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_execution_IAM_role.html
			Policies attached to the role (Fargate and EC2 launch types):

			  * NewRelicSSMLicenseKeyReadAccess (created by the installer).
			  * AmazonEC2ContainerServiceforEC2Role
			  * AmazonECSTaskExecutionRolePolicy

		  - Registers the "newrelic-infra" ECS task definition. (EC2 launch type)

		  - Creates the service "newrelic-infra" for the registered task
			using DAEMON scheduling strategy. (EC2 launch type)
```
	
	
* download the taskdefinition file and add it as side car 
	ref: [Tutorial: Creating a Cluster with a Fargate Task Using the AWS CLI - Amazon Elastic Container Service](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ECS_AWSCLI_Fargate.html)
	
	* link service to task definition
		
	 modified the task definition:
	 
	 * replace the secret name from system paramter -> parameter store -> new relic 
	 
```json
	 {
  "executionRoleArn": "<YOUR_TASK_EXECUTION_ROLE>",
  "networkMode": "awsvpc",
  "requiresCompatibilities": [
    "FARGATE"
  ],
  "cpu": "256",
  "memory": "512",
  "containerDefinitions": [
    {
      "portMappings": [
        {
          "hostPort": 80,
          "protocol": "tcp",
          "containerPort": 80
        }
      ],
      "image": "busybox:latest",
      "name": "busybox"
    },
    {
      "environment": [
        {
          "name": "NRIA_OVERRIDE_HOST_ROOT",
          "value": ""
        },
        {
          "name": "NRIA_IS_FORWARD_ONLY",
          "value": "true"
        },
        {
          "name": "FARGATE",
          "value": "true"
        },
        {
          "name": "ENABLE_NRI_ECS",
          "value": "true"
        },
        {
          "name": "NRIA_PASSTHROUGH_ENVIRONMENT",
          "value": "ECS_CONTAINER_METADATA_URI,ENABLE_NRI_ECS,FARGATE"
        },
        {
          "name": "NRIA_CUSTOM_ATTRIBUTES",
          "value": "{\"nrDeployMethod\":\"downloadPage\"}"
        }
      ],
      "secrets": [
        {
          "valueFrom": "<SYSTEM_MANAGER_LICENSE_PARAMETER_NAME>",
          "name": "NRIA_LICENSE_KEY"
        }
      ],
      "cpu": 256,
      "memoryReservation": 512,
      "image": "newrelic/infrastructure-bundle:2.4.1",
      "name": "newrelic-infra"
    }
  ],
  "family": "BusyBoxWithNewRelicInfraSidecar"
}
	 ```
	how to add a side car task ?
	