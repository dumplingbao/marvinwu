---

Date: 2021-06-30
Topic:
-  til
-  AWS
-  VPC
Ref:


---

### VPC aws cross region

* [What is VPC peering? - Amazon Virtual Private Cloud](https://docs.aws.amazon.com/vpc/latest/peering/what-is-vpc-peering.html)

	> The VPCs can be in different regions (also known as an inter-region VPC peering connection).
	
* [Create an AWS VPC Peering Connection | by Vishal Sharma | Medium](https://medium.com/@vishal.sharma./create-an-aws-vpc-peering-connection-47ce518de870)

	#🚧  follow
	
	peering vpc:
	
	* create peering request
	* accept the peering request
	* create routes on both end
	* edit the security group 
	

* [How to create AWS VPC Peering - Step by Step Tutorial | Devops Junction](https://www.middlewareinventory.com/blog/aws-vpc-peering-tutorial/)

	> Subnets for Default VPC are ==auto created but not for custom VPC==, so go ahead and create one

* [VPC Peering in AWS | by Chris Hare | Medium](https://labrlearning.medium.com/vpc-peering-in-aws-cadf84eb1f85)

### VPC internet gateway
	
* [AWS Internet Gateway and VPC Routing - DZone Cloud](https://dzone.com/articles/aws-internet-gateway-and-vpc-routing)

> Remember, an internet gateway is used to allow internet traffic to VPC, so it needs to be associated with a VPC.
> This will allow traffic to enter the VPC, but we can lock it down. That’s where Security Groups are going to come into play (we will talk about those a little bit later).

> If a subnet is associated with a route table redirecting all traffic to an internet gateway, it is called a ==public subnet==.


* [AWS — Difference between Internet Gateway and NAT Gateway | by Ashish Patel | Awesome Cloud | Medium](https://medium.com/awesome-cloud/aws-vpc-difference-between-internet-gateway-and-nat-gateway-c9177e710af6)
	
	> Internet Gateway (IGW) allows instances with ==public IPs== to access the internet.
	> NAT Gateway (NGW) allows instances with ==no public IPs== to access the internet.

	> routing table entry allowing a subnet to access the IGW.
	
	Nat gateway limitation:
	>  Security Groups cannot be associated with a NAT Gateway. ==only vpc can assoicate with nat gateway ?==
	>  You’ll need one in each AZ since they only operate in a single AZ.
	
		
* [VPCs, subnets, and gateways – fundamentals for working with containers in AWS – Tom Gregory](https://tomgregory.com/aws-networking-fundamentals-for-working-with-containers/)

   Very good detailed guide on key concepts of aws networking components.

	What is VPC: private cloud 
	
	configurable:
	> Name – you can name your VPC by providing a ==Name== tag
	> IP address range – the range of ==private== IP addresses 

	Internet gateway
	
	```mermaid
	flowchart LR
		internet <---> internet_gateway
		internet_gateway <---> public_subnet
	```

	Nat gateway:
	
	```mermaid
	flowchart LR
		internet <---> nat_gateway
		nat_gateway <---> private_subnet
	```

	routing table:
	routing table is attached to subnet
	![[Pasted image 20210702170207.png]]
	
	aws regions:
	
	> In AWS a region is a separate geographical area where you might want to deploy your service. ==A region is split up into separate isolated physical datacentres called availability zones. Each region has at least two availability zones.==

	#🚧  follow the tutorial to create stack

	
* [Configuring VPC Subnet Allocation of Public IP Addresses (AWS) | Iguazio](https://www.iguazio.com/docs/latest-release/cluster-mgmt/deployment/cloud/aws/howto/subnet-public-ips-alloc-cfg/)

	how to assign ==public ip== to a vpc subnet
	
	![[Pasted image 20210702180209.png]]

### vpc peering tutorial


### vpc reachability analyzer

	
* [网络排错神器 VPC- Reachability Analyzer 来了！您get了吗？ - 伊克罗德信息科技](https://www.ecloudrover.com/h-nd-113.html)

	good tutorial
	
![[Pasted image 20210705141045.png]]


***

* how to add a nat-gateway to a vpc ?

	ref: [Set up a NAT Gateway](https://aws.amazon.com/premiumsupport/knowledge-center/nat-gateway-vpc-private-subnet/)

	* Create a public VPC subnet to host the NAT gateway. The route table for the subnet should contain a route to the Internet through an Internet gateway.
	* Provision an unattached Elastic IP address (EIP) to your account. You’ll need to associate this IP address with the NAT gateway.
	* Update the route table of the private subnet hosting the EC2 instances that need Internet access. The route table should be updated to direct Internet-bound traffic to the NAT gateway.


* how can you connect a VPC to amazon services like sns/s3/aws ?

by creating an endpoint 

[Create Endpoint | VPC Management Console](https://ap-southeast-1.console.aws.amazon.com/vpc/home?region=ap-southeast-1#CreateVpcEndpoint:vpcEndpointId=vpce-0a282efa39a5e6b70)


* What is security group ?
[Security groups for your VPC - Amazon Virtual Private Cloud](https://docs.aws.amazon.com/vpc/latest/userguide/VPC_SecurityGroups.html)

![[Pasted image 20210630171546.png]]


> A security group acts as a virtual firewall for your instance to control inbound and outbound traffic.

Basically firewall?

* what is VPC ?

VPC tied everything together

![[Pasted image 20210630172047.png]]

This is the networking part, think virtual routers

[What is Amazon VPC? - Amazon Virtual Private Cloud](https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html)

> The following are the key concepts for VPCs:
> Virtual private cloud (VPC) — A virtual network dedicated to your AWS account.
> Subnet — A range of IP addresses in your VPC.
> Route table — A set of rules, called routes, that are used to determine where network traffic is directed.
> Internet gateway — A gateway that you attach to your VPC to enable communication between resources in your VPC and the internet.
> VPC endpoint — Enables you to privately connect your VPC to supported AWS services and VPC endpoint services powered by PrivateLink without requiring an internet gateway, NAT device, VPN connection, or AWS Direct Connect connection. Instances in your VPC do not require public IP addresses to communicate with resources in the service. Traffic between your VPC and the other service does not leave the Amazon network. For more information, see AWS PrivateLink and VPC endpoints.
> CIDR block —Classless Inter-Domain Routing. An internet protocol address allocation and route aggregation methodology. For more information, see Classless Inter-Domain Routing in Wikipedia.

* can vpc cross region?

 no

* what is target local ?

> A gateway route table supports routes where the target is local (the default local route)
![[Pasted image 20210630174043.png]]

* how to distinguish between public and private subnet( and assign IGW and nat gateway accordingly ?
	
	vpc -> subnets-> auto -assign ip public ip v4 address
	
	![[Pasted image 20210702181232.png]]
	
* hohw to setup a public subnet in VPC ?

ref:[VPC with a single public subnet - Amazon Virtual Private Cloud](https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Scenario1.html)


	
* to rds

![[Pasted image 20210630174221.png]]



* How to test?


