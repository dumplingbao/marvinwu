---

Date: 2021-07-05
Topic:
-  Urban Spring
-  VPC survey
Ref:
---


```mermaid
flowchart LR
    well2-lambda[well2-us-lambda<br/>vpc-0221048edfa2aff9e<br/> ap-southeast-1 <br/> 10.43.0.0/16 ] <---> vpc-rds[vpc-0772f2a48a29e2671<br/>  ap-southeast-1 <br/> 172.30.0.0/16]
    well1-lambda[well1-lambda<br/>vpc-0221048edfa2aff9e<br/> ap-southeast-1 <br/> 10.43.0.0/16 ] <---> vpc-rds[vpc-0772f2a48a29e2671<br/>  ap-southeast-1 <br/> 172.30.0.0/16]
	vpc-rds --- RDS[RDS <br/> subnet-0d221304e33625cee 172.30.2.0/24 <br/> subnet-0030d3bb0d112504e 172.30.1.0/24 <br/> subnet-06bfc956632613f8d 172.30.0.0/24]
	vpc-rds --- alert-api[ALERT API <br/>subnet-012cf8d9d06a4f42a 172.30.3.0/24 <br/> subnet-08f05cdc44b3e0a7f 172.30.4.0/24]
```





