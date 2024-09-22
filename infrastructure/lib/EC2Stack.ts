import { CfnOutput, Stack, StackProps } from "aws-cdk-lib";
import {
  AmazonLinuxImage,
  Instance,
  InstanceClass,
  InstanceSize,
  InstanceType,
  KeyPair,
  MachineImage,
  Peer,
  Port,
  SecurityGroup,
  SubnetType,
  Vpc,
} from "aws-cdk-lib/aws-ec2";
import { Construct } from "constructs";

interface RootStackProps extends StackProps {
  paramsEnv: string;
}
export class EC2Stack extends Stack {
  constructor(scope: Construct, id: string, props?: RootStackProps) {
    super(scope, id, props);

    // use default vpc as it is free of charge
    const vpc = new Vpc(this, "give-it-a-good-name-vpc-prod", {
      maxAzs: 1,
      // nat gateways are not covered by free tier
      // so we cannot put our ec2 under private subnet and exposed to public via NAT Gateways
      natGateways: 0,
      subnetConfiguration: [
        { cidrMask: 24, name: "PublicSubnet", subnetType: SubnetType.PUBLIC },
      ],
    });

    const securityGroup = new SecurityGroup(this, "AppSG-prod", {
      vpc,
      description:
        "Allow inbound from ports 3000(node) and 80(react) and 8080(db admin) and 8888(pgadmin)",
      allowAllOutbound: true,
    });
    securityGroup.addEgressRule(Peer.anyIpv4(), Port.allTraffic());

    securityGroup.addIngressRule(Peer.anyIpv4(), Port.tcp(443));
    securityGroup.addIngressRule(Peer.anyIpv4(), Port.tcp(22));
    securityGroup.addIngressRule(Peer.anyIpv4(), Port.tcp(3000));
    securityGroup.addIngressRule(Peer.anyIpv4(), Port.tcp(8080));
    securityGroup.addIngressRule(Peer.anyIpv4(), Port.tcp(8888));

    const ec2Instance = new Instance(this, "EC2Instance-prod", {
      vpc,
      // free tier t2.micro
      vpcSubnets: { subnetType: SubnetType.PUBLIC },
      instanceType: InstanceType.of(InstanceClass.T2, InstanceSize.MICRO),
      machineImage: MachineImage.latestAmazonLinux2023(),
      securityGroup,
      instanceName: "give-it-a-good-name-ec2-prod",
      keyPair: KeyPair.fromKeyPairName(this, "KeyPair", "mykey"),
    });

    ec2Instance.userData.addCommands(
      // update existing packages
      "sudo yum update -y",
      // install docker
      "sudo yum install -y docker",
      "sudo service docker start",
      "sudo usermod -a -G docker ec2-user",
      // install docker-compose
      "sudo curl -L https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose",
      "sudo chmod +x /usr/local/bin/docker-compose"
    );
    // output ec2 public ip address so we can use it in github actions
    new CfnOutput(this, "EC2PublicDNS", {
      value: ec2Instance.instancePublicDnsName,
      exportName: "EC2PublicDNS",
    });
  }
}
