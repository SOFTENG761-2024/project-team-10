interface StackParams {
  deploymentAccount: string;
  deploymentRegion: string;
  resourceNameSuffix: string;
}

const accounts = {
  // mark's account
  dev: "780816973348",
  prod: "149536468405",
};

export const params: { [x: string]: StackParams } = {
  dev: {
    deploymentAccount: accounts["dev"],
    deploymentRegion: "ap-southeast-2",
    resourceNameSuffix: "dev",
  },
  prod: {
    deploymentAccount: accounts["prod"],
    deploymentRegion: "ap-southeast-2",
    resourceNameSuffix: "prod",
  },
};
