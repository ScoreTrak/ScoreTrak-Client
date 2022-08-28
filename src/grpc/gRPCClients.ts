import { token } from "./token/token";

import { AuthServicePromiseClient } from "@buf/grpc_web_scoretrak_scoretrakapis/scoretrak/auth/v1/auth_grpc_web_pb"
import { CheckServicePromiseClient } from "@buf/grpc_web_scoretrak_scoretrakapis/scoretrak/check/v1/check_grpc_web_pb";
import { CompetitionServicePromiseClient } from "@buf/grpc_web_scoretrak_scoretrakapis/scoretrak/competition/v1/competition_grpc_web_pb";
import { HostServicePromiseClient } from "@buf/grpc_web_scoretrak_scoretrakapis/scoretrak/host/v1/host_grpc_web_pb";
import { HostGroupServicePromiseClient } from "@buf/grpc_web_scoretrak_scoretrakapis/scoretrak/host_group/v1/host_group_grpc_web_pb";
import { PolicyServicePromiseClient } from "@buf/grpc_web_scoretrak_scoretrakapis/scoretrak/policy/v1/policy_grpc_web_pb";
import { PropertyServicePromiseClient } from "@buf/grpc_web_scoretrak_scoretrakapis/scoretrak/property/v1/property_grpc_web_pb";
import { ReportServicePromiseClient } from "@buf/grpc_web_scoretrak_scoretrakapis/scoretrak/report/v1/report_grpc_web_pb";
import { RoundServicePromiseClient } from "@buf/grpc_web_scoretrak_scoretrakapis/scoretrak/round/v1/round_grpc_web_pb";
import { ServiceServicePromiseClient } from "@buf/grpc_web_scoretrak_scoretrakapis/scoretrak/service/v1/service_grpc_web_pb";
import {
  ServiceGroupServicePromiseClient
} from "@buf/grpc_web_scoretrak_scoretrakapis/scoretrak/service_group/v1/service_group_grpc_web_pb";
import { TeamServicePromiseClient } from "@buf/grpc_web_scoretrak_scoretrakapis/scoretrak/team/v1/team_grpc_web_pb";
import { UserServicePromiseClient } from "@buf/grpc_web_scoretrak_scoretrakapis/scoretrak/user/v1/user_grpc_web_pb";
import {
  DynamicConfigServicePromiseClient, StaticConfigServicePromiseClient
} from "@buf/grpc_web_scoretrak_scoretrakapis/scoretrak/config/v1/config_grpc_web_pb";

const serverAddress = import.meta.env.ST_API_SERVER_URL ?? window.location.origin


export type GRPCClients = {
  auth: { v1: { authServicePromiseClient: AuthServicePromiseClient } },
  check: { v1: { checkServicePromiseClient: CheckServicePromiseClient } },
  competition: { v1: { competitionServicePromiseClient: CompetitionServicePromiseClient } },
  config: {
    v1: {
      dynamicConfigServicePromiseClient: DynamicConfigServicePromiseClient,
      staticConfigServicePromiseClient: StaticConfigServicePromiseClient
    }
  },
  host: { v1: { hostServicePromiseClient: HostServicePromiseClient } },
  host_group: { v1: { hostGroupServicePromiseClient: HostGroupServicePromiseClient } },
  policy: { v1: { policyServicePromiseClient: PolicyServicePromiseClient } },
  property: { v1: { propertyServicePromiseClient: PropertyServicePromiseClient } },
  report: { v1: { reportServicePromiseClient: ReportServicePromiseClient } },
  round: { v1: { roundServicePromiseClient: RoundServicePromiseClient } },
  service: { v1: { serviceServicePromiseClient: ServiceServicePromiseClient } },
  service_group: { v1: { serviceGroupServicePromiseClient: ServiceGroupServicePromiseClient } },
  team: { v1: { teamServicePromiseClient: TeamServicePromiseClient } },
  user: { v1: { userServicePromiseClient: UserServicePromiseClient } },
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
  auth: { v1: { authServicePromiseClient: new AuthServicePromiseClient(serverAddress, null, options) }},
  check: { v1: { checkServicePromiseClient: new CheckServicePromiseClient(serverAddress, null, options) }},
  competition: { v1: { competitionServicePromiseClient: new CompetitionServicePromiseClient(serverAddress, null, options) }},
  config: {
    v1: {
      dynamicConfigServicePromiseClient: new DynamicConfigServicePromiseClient(serverAddress, null, options),
      staticConfigServicePromiseClient: new StaticConfigServicePromiseClient(serverAddress, null, options)
    }
  },
  host: { v1: { hostServicePromiseClient: new HostServicePromiseClient(serverAddress, null, options) }},
  host_group: { v1: { hostGroupServicePromiseClient: new HostGroupServicePromiseClient(serverAddress, null, options) }},
  policy: { v1: { policyServicePromiseClient: new PolicyServicePromiseClient(serverAddress, null, options) }},
  property: { v1: { propertyServicePromiseClient: new PropertyServicePromiseClient(serverAddress, null, options) }},
  report: { v1: { reportServicePromiseClient: new ReportServicePromiseClient(serverAddress, null, options) }},
  round:  { v1: { roundServicePromiseClient: new RoundServicePromiseClient(serverAddress, null, options) }},
  service: { v1: { serviceServicePromiseClient: new ServiceServicePromiseClient(serverAddress, null, options) }},
  service_group: { v1: { serviceGroupServicePromiseClient: new ServiceGroupServicePromiseClient(serverAddress, null, options) }},
  team: { v1: { teamServicePromiseClient: new TeamServicePromiseClient(serverAddress, null, options) }},
  user: { v1: { userServicePromiseClient: new UserServicePromiseClient(serverAddress, null, options) }},
};
