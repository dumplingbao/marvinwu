---

Date: 2021-07-05
Topic:
-  Urban Spring
-  VPC survey
Ref:
---

### Testing Env

```mermaid
flowchart TD

vpc-well2-lambda[vpc-well2-lambda<br/>vpc-0221048edfa2aff9e<br/> well2-us-west-2 <br/> 10.43.0.0/16 ] 
vpc-rds[vpc-RDS<br/>vpc-0772f2a48a29e2671<br/>  ap-southeast-1 <br/> 172.30.0.0/16]
vpc-well1-lambda[vpc-well1-lambda<br/>vpc-0c148e15806c467b5<br/> well1ap-southeast-1 <br/> 10.10.0.0/16 ] 
lambda-well1-csv[lambda-CSV<br/>subnet-0c33b458fcf84d32a 10.10.160.0/19 <br/>subnet-0e332ae06ba943416 10.10.192.0/19] 
nat-gateway-testing[(Nat-Gateway<br/>nat-0773d497fa600c461<br/>subnet-06bfc956632613f8d<br/>172.30.0.110)]

route-table-bdaf{route-table-bdaf<br/>rtb-0d139aad0aa97bdaf / ain-public-subnet<br/>172.30.0.0/16->local<br/>10.10.0.0/6->well1-lambda<br/>10.43.0.0/16->well2-lambda<br/>0.0.0.0/0->igw-05ca1153f37b4095a}

route-table-7e27{route-table-7e27<br/>rtb-0ff6a9e5b27c57e27<br/> lambda-private-rt<br/> 172.30.0.0/16->local<br/>0.0.0.0/0->nat-0773d497fa600c461<br/>10.10.0.0/16->well1-lambda<br/>10.43.0.0/16->well2-lambda}

route-table-0191{route-table-0191<br/>rtb-0d7542ca316130191<br/>172.30.0.016->well2-rds<br/>10.43.0.0/16->local<br/> aws-s3->vpce-0a3c7d7de7c7647bb<br/>0.0.0.0/0->nat-0c6485f6d4b1c4a45>}

route-table-f60d{route-table-f60d<br/>10.43.0.0/16->local<br/>0.0.0.0/0->igw-05b523478e4f5a2b0}

subnet-b045[subnet-0d206086de6c4b045<br/> public subnet/public ip <br/>10.43.196.0/24]


subnet-20cb[subnet-0b8b876ba6fa420cb<br/> public ip <br/>10.43.32.0/19]
subnet-b0de[subnet-0f57daef2862db0de<br/> public ip <br/>10.43.64.0/19]

subnet-f42a[subnet-012cf8d9d06a4f42a<br/>public ip<br/> 172.30.3.0/24]
subnet-0a7f[subnet-08f05cdc44b3e0a7f<br/>public ip <br/> 172.30.4.0/24]

RDS[RDS <br/> subnet-0d221304e33625cee 172.30.2.0/24 <br/> subnet-0030d3bb0d112504e 172.30.1.0/24 <br/> subnet-06bfc956632613f8d 172.0.0.0/24] 

subnet-b045---vpc-well2-lambda

subnet-b045---route-table-f60d


route-table-0191---subnet-20cb
route-table-0191---subnet-b0de

vpc-well1-lambda<---> vpc-rds
lambda-well1-csv---vpc-well1-lambda 
route-table-bdaf---nat-gateway-testing
nat-gateway-testing---vpc-rds
nat-gateway-testing--->|EIP 18.136.177.39|Internet
RDS--- vpc-rds 
alert-api[lambda-ALERT API] ---subnet-f42a
alert-api ---subnet-0a7f
subnet-20cb---vpc-well2-lambda
vpc-well2-lambda<---> vpc-rds
lambda-well2-iot ---subnet-20cb
lambda-well2-iot ---subnet-b0de
subnet-b0de---vpc-well2-lambda
subnet-f42a---vpc-rds 
subnet-0a7f---vpc-rds 

subnet-f42a---route-table-7e27
subnet-0a7f---route-table-7e27
```

### Production Env

```mermaid
flowchart LR

us-prod-vpc[VPC-PRODUCTION<br/>vpc-02875ce083bd8f0aa<br/>production-ap-southeast-1<br/>10.0.0.0/16] 

route-table-92f6{route-table-92f6<br/>rtb-0e352c5a0976092f6 us-prod-lambda-rt<br/>10.0.0.0/16->local<br/>0.0.0.0/0->nat-05e3854cdbb910959<br/>}

route-table-883d{route-table-883d<br/>10.0.0.0/16->local<br/>0.0.0.0/0->igw-01e040fe139574d26}


route-table-ba25{route-table-ba25<br/>10.0.0.0/16->local<br/>0.0.0.0/0->igw-01e040fe139574d26<br/>vpc interface endpoint -> s3}



subnet-18e1[subnet-18e1 <br/>public ip/public subnet<br/>us-prod-ec2-1-pub<br/>subnet-02ecfbbce7a7f18e1<br/> 10.0.32.0/24]

RDS[RDS<br/>subnet-01ac35868313e7870 10.0.1.0/24 <br/>subnet-0e771e8a4064956d9 10.0.2.0/24]

subnet-8a86[subnet-8a86<br/>private ip <br/> ap-southeast-1a, us-prod-api-ecs-lambda-3-public<br/>subnet-0c6280edbc1d08a86<br/> 10.0.20.0/24]

subnet-99a3[subnet-99a3<br/>private ip <br/> ap-southeast-1b, us-prod-alerting-api-pri-2<br/>subnet-05b84571b0dd799a3<br/> 10.0.42.0/24]

subnet-7b72[subnet-7b72 <br/>private ip<br/>ap-southeast-1a, us-prod-alerting-api-pri-1 nat-ec2-1-pub-igw<br/>subnet-07da72fcec3227b72<br/> 10.0.40.0/24]


subnet-0428[subnet-022a6e92377680428 <br/>private ip<br/>10.0.22.0/24 ]

subnet-0428---route-table-ba25
subnet-8a86---route-table-ba25

subnet-18e1---route-table-883d
us-prod-vpc---RDS
subnet-18e1---us-prod-vpc 
nat-gateway-production---subnet-18e1
nat-gateway-production-->|EIP 18.138.215.80|Internet
subnet-8a86---us-prod-vpc
subnet-99a3---route-table-92f6
subnet-99a3---us-prod-vpc
subnet-7b72---us-prod-vpc 
subnet-7b72---route-table-92f6

lambda-well1-csv---subnet-0428
lambda-well1-csv---subnet-8a86
lambda-ust-usage-sync---subnet-0428
lambda-ust-usage-sync---subnet-8a86
lambda-well2-iot --- subnet-7b72
lambda-well2-iot --- subnet-99a3

lambda-alert-api --- subnet-7b72
lambda-alert-api--- subnet-99a3
lambda-bottle-sync --- subnet-99a3
lambda-bottle-sync --- subnet-7b72
lambda-consumable --- subnet-99a3
lambda-consumable --- subnet-7b72
lambda-db-sync --- subnet-99a3
lambda-db-sync--- subnet-7b72
lambda-water-test --- subnet-99a3
lambda-water-test--- subnet-7b72	
```



