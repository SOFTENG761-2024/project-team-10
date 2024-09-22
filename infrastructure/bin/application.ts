import { App } from "aws-cdk-lib";
import { EC2Stack } from "../lib/EC2Stack";
import { params } from "../lib/params";

const app = new App();

const paramsEnv: string = app.node.tryGetContext("paramsEnv");

if (!paramsEnv) {
  throw new Error(
    "env context must be supplied. See package.json scripts for example usage"
  );
}

const stackParams = params[paramsEnv];

switch (paramsEnv) {
  case "dev": {
    new EC2Stack(app, "DevStack", {
      paramsEnv,
      env: {
        account: stackParams.deploymentAccount,
        region: stackParams.deploymentRegion,
      },
    });
    break;
  }
  case "prod": {
    new EC2Stack(app, "ProdStack", {
      paramsEnv,
      env: {
        account: stackParams.deploymentAccount,
        region: stackParams.deploymentRegion,
      },
    });
    break;
  }
}
