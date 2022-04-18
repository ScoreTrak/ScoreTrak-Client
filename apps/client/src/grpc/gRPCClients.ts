import { token } from "./token/token";

import { AuthServiceClient } from "@scoretrak/scoretrakapis/scoretrak/auth/v1/AuthServiceClientPb";
import { CheckServiceClient } from "@scoretrak/scoretrakapis/scoretrak/check/v1/CheckServiceClientPb";
import { CompetitionServiceClient } from "@scoretrak/scoretrakapis/scoretrak/competition/v1/CompetitionServiceClientPb";
import {
  DynamicConfigServiceClient,
  StaticConfigServiceClient,
} from "@scoretrak/scoretrakapis/scoretrak/config/v1/ConfigServiceClientPb";
import { HostServiceClient } from "@scoretrak/scoretrakapis/scoretrak/host/v1/HostServiceClientPb";
import { HostGroupServiceClient } from "@scoretrak/scoretrakapis/scoretrak/host_group/v1/Host_groupServiceClientPb";
import { PolicyServiceClient } from "@scoretrak/scoretrakapis/scoretrak/policy/v1/PolicyServiceClientPb";
import { PropertyServiceClient } from "@scoretrak/scoretrakapis/scoretrak/property/v1/PropertyServiceClientPb";
import { ReportServiceClient } from "@scoretrak/scoretrakapis/scoretrak/report/v1/ReportServiceClientPb";
import { RoundServiceClient } from "@scoretrak/scoretrakapis/scoretrak/round/v1/RoundServiceClientPb";
import { ServiceServiceClient } from "@scoretrak/scoretrakapis/scoretrak/service/v1/ServiceServiceClientPb";
import { ServiceGroupServiceClient } from "@scoretrak/scoretrakapis/scoretrak/service_group/v1/Service_groupServiceClientPb";
import { TeamServiceClient } from "@scoretrak/scoretrakapis/scoretrak/team/v1/TeamServiceClientPb";
import { UserServiceClient } from "@scoretrak/scoretrakapis/scoretrak/user/v1/UserServiceClientPb";

const serverAddress = import.meta.env.ST_SERVER_HOSTNAME;

export type GRPCClients = {
  authClient: AuthServiceClient;
  checkClient: CheckServiceClient;
  competitionClient: CompetitionServiceClient;
  dynamicConfigClient: DynamicConfigServiceClient;
  staticConfigClient: StaticConfigServiceClient;
  hostClient: HostServiceClient;
  hostGroupClient: HostGroupServiceClient;
  policyClient: PolicyServiceClient;
  propertyClient: PropertyServiceClient;
  reportClient: ReportServiceClient;
  roundClient: RoundServiceClient;
  serviceClient: ServiceServiceClient;
  serviceGroupClient: ServiceGroupServiceClient;
  teamClient: TeamServiceClient;
  userClient: UserServiceClient;
};

class AuthInterceptor {
  intercept = (request: any, invoker: any) => {
    if (token.isAValidToken()) {
      const metadata = request.getMetadata(undefined, undefined);
      metadata.authorization = token.getToken();
    }
    return invoker(request);
  };
}

const options = {
  unaryInterceptors: [new AuthInterceptor()],
  streamInterceptors: [new AuthInterceptor()],
};

export const gRPCClients: GRPCClients = {
  authClient: new AuthServiceClient(serverAddress, null, options),
  checkClient: new CheckServiceClient(serverAddress, null, options),
  competitionClient: new CompetitionServiceClient(serverAddress, null, options),
  dynamicConfigClient: new DynamicConfigServiceClient(
    serverAddress,
    null,
    options
  ),
  staticConfigClient: new StaticConfigServiceClient(
    serverAddress,
    null,
    options
  ),
  hostClient: new HostServiceClient(serverAddress, null, options),
  hostGroupClient: new HostGroupServiceClient(serverAddress, null, options),
  policyClient: new PolicyServiceClient(serverAddress, null, options),
  propertyClient: new PropertyServiceClient(serverAddress, null, options),
  reportClient: new ReportServiceClient(serverAddress, null, options),
  roundClient: new RoundServiceClient(serverAddress, null, options),
  serviceClient: new ServiceServiceClient(serverAddress, null, options),
  serviceGroupClient: new ServiceGroupServiceClient(
    serverAddress,
    null,
    options
  ),
  teamClient: new TeamServiceClient(serverAddress, null, options),
  userClient: new UserServiceClient(serverAddress, null, options),
};
