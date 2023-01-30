import {
  AuthServicePromiseClient as AuthV1ServicePromiseClient
} from "@buf/scoretrak_scoretrakapis.grpc_web/scoretrak/auth/v1/auth_grpc_web_pb";
import {
  AuthServicePromiseClient as AuthV2ServicePromiseClient
} from "@buf/scoretrak_scoretrakapis.grpc_web/scoretrak/auth/v2/auth_grpc_web_pb";
import {
  CheckServicePromiseClient as CheckV1ServicePromiseClient
} from "@buf/scoretrak_scoretrakapis.grpc_web/scoretrak/check/v1/check_grpc_web_pb";
import {
  CheckServicePromiseClient as CheckV2ServicePromiseClient
} from "@buf/scoretrak_scoretrakapis.grpc_web/scoretrak/check/v2/check_grpc_web_pb";
import {
  CompetitionServicePromiseClient as CompetitionV1ServicePromiseClient
} from "@buf/scoretrak_scoretrakapis.grpc_web/scoretrak/competition/v1/competition_grpc_web_pb";
import {
  CompetitionServicePromiseClient as CompetitionV2ServicePromiseClient
} from "@buf/scoretrak_scoretrakapis.grpc_web/scoretrak/competition/v2/competition_grpc_web_pb";
import {
  HostServicePromiseClient as HostV1ServicePromiseClient
} from "@buf/scoretrak_scoretrakapis.grpc_web/scoretrak/host/v1/host_grpc_web_pb";
import {
  HostServicePromiseClient as HostV2ServicePromiseClient
} from "@buf/scoretrak_scoretrakapis.grpc_web/scoretrak/host/v2/host_grpc_web_pb";
import {
  HostGroupServicePromiseClient as HostGroupV1ServicePromiseClient
} from "@buf/scoretrak_scoretrakapis.grpc_web/scoretrak/host_group/v1/host_group_grpc_web_pb";
import {
  HostGroupServicePromiseClient as HostGroupV2ServicePromiseClient
} from "@buf/scoretrak_scoretrakapis.grpc_web/scoretrak/host_group/v2/host_group_grpc_web_pb";
import {
  PolicyServicePromiseClient as PolicyV1ServicePromiseClient
} from "@buf/scoretrak_scoretrakapis.grpc_web/scoretrak/policy/v1/policy_grpc_web_pb";
import {
  PolicyServicePromiseClient as PolicyV2ServicePromiseClient
} from "@buf/scoretrak_scoretrakapis.grpc_web/scoretrak/policy/v2/policy_grpc_web_pb";
import {
  PropertyServicePromiseClient as PropertyV1ServicePromiseClient
} from "@buf/scoretrak_scoretrakapis.grpc_web/scoretrak/property/v1/property_grpc_web_pb";
import {
  PropertyServicePromiseClient as PropertyV2ServicePromiseClient
} from "@buf/scoretrak_scoretrakapis.grpc_web/scoretrak/property/v2/property_grpc_web_pb";
import {
  ReportServicePromiseClient as ReportV1ServicePromiseClient
} from "@buf/scoretrak_scoretrakapis.grpc_web/scoretrak/report/v1/report_grpc_web_pb";
import {
  ReportServicePromiseClient as ReportV2ServicePromiseClient
} from "@buf/scoretrak_scoretrakapis.grpc_web/scoretrak/report/v2/report_grpc_web_pb";
import {
  RoundServicePromiseClient as RoundV1ServicePromiseClient
} from "@buf/scoretrak_scoretrakapis.grpc_web/scoretrak/round/v1/round_grpc_web_pb";
import {
  RoundServicePromiseClient as RoundV2ServicePromiseClient
} from "@buf/scoretrak_scoretrakapis.grpc_web/scoretrak/round/v2/round_grpc_web_pb";
import {
  ServiceServicePromiseClient as ServiceV1ServicePromiseClient
} from "@buf/scoretrak_scoretrakapis.grpc_web/scoretrak/service/v1/service_grpc_web_pb";
import {
  ServiceServicePromiseClient as ServiceV2ServicePromiseClient
} from "@buf/scoretrak_scoretrakapis.grpc_web/scoretrak/service/v2/service_grpc_web_pb";
import {
  ServiceGroupServicePromiseClient as ServiceGroupV1ServicePromiseClient
} from "@buf/scoretrak_scoretrakapis.grpc_web/scoretrak/service_group/v1/service_group_grpc_web_pb";
import {
  ServiceGroupServicePromiseClient as ServiceGroupV2ServicePromiseClient
} from "@buf/scoretrak_scoretrakapis.grpc_web/scoretrak/service_group/v2/service_group_grpc_web_pb";
import {
  TeamServicePromiseClient as TeamV1ServicePromiseClient
} from "@buf/scoretrak_scoretrakapis.grpc_web/scoretrak/team/v1/team_grpc_web_pb";
import {
  TeamServicePromiseClient as TeamV2ServicePromiseClient
} from "@buf/scoretrak_scoretrakapis.grpc_web/scoretrak/team/v2/team_grpc_web_pb";
import {
  UserServicePromiseClient as UserV1ServicePromiseClient
} from "@buf/scoretrak_scoretrakapis.grpc_web/scoretrak/user/v1/user_grpc_web_pb";
import {
  UserServicePromiseClient as UserV2ServicePromiseClient
} from "@buf/scoretrak_scoretrakapis.grpc_web/scoretrak/user/v2/user_grpc_web_pb";
import {
  DynamicConfigServicePromiseClient as DynamicConfigV1ServicePromiseClient,
  StaticConfigServicePromiseClient as StaticConfigV1ServicePromiseClient
} from "@buf/scoretrak_scoretrakapis.grpc_web/scoretrak/config/v1/config_grpc_web_pb";
import {
  DynamicConfigServicePromiseClient as DynamicConfigV2ServicePromiseClient,
  StaticConfigServicePromiseClient as StaticConfigV2ServicePromiseClient
} from "@buf/scoretrak_scoretrakapis.grpc_web/scoretrak/config/v2/config_grpc_web_pb";
import { AuthInterceptor } from "~/lib/interceptors/authInterceptor.grpc-web";

const serverAddress =
  import.meta.env.VITE_API_SERVER_URL ?? window.location.origin;

export type GRPCClients = {
  auth: { v1: { authServicePromiseClient: AuthV1ServicePromiseClient }, v2: {authServicePromiseClient: AuthV2ServicePromiseClient} };
  check: { v1: { checkServicePromiseClient: CheckV1ServicePromiseClient }, v2: { checkServicePromiseClient: CheckV2ServicePromiseClient } };
  competition: {
    v1: { competitionServicePromiseClient: CompetitionV1ServicePromiseClient };
    v2: { competitionServicePromiseClient: CompetitionV2ServicePromiseClient };
  };
  config: {
    v1: {
      dynamicConfigServicePromiseClient: DynamicConfigV1ServicePromiseClient;
      staticConfigServicePromiseClient: StaticConfigV1ServicePromiseClient;
    },
    v2: {
      dynamicConfigServicePromiseClient: DynamicConfigV2ServicePromiseClient;
      staticConfigServicePromiseClient: StaticConfigV2ServicePromiseClient;
    };
  };
  host: { v1: { hostServicePromiseClient: HostV1ServicePromiseClient }, v2: { hostServicePromiseClient: HostV2ServicePromiseClient } };
  host_group: {
    v1: { hostGroupServicePromiseClient: HostGroupV1ServicePromiseClient },
    v2: { hostGroupServicePromiseClient: HostGroupV2ServicePromiseClient };
  };
  policy: { v1: { policyServicePromiseClient: PolicyV1ServicePromiseClient }, v2: { policyServicePromiseClient: PolicyV2ServicePromiseClient } };
  property: {
    v1: { propertyServicePromiseClient: PropertyV1ServicePromiseClient };
    v2: { propertyServicePromiseClient: PropertyV2ServicePromiseClient };
  };
  report: { v1: { reportServicePromiseClient: ReportV1ServicePromiseClient }, v2: { reportServicePromiseClient: ReportV2ServicePromiseClient } };
  round: { v1: { roundServicePromiseClient: RoundV1ServicePromiseClient }, v2: { roundServicePromiseClient: RoundV2ServicePromiseClient } };
  service: { v1: { serviceServicePromiseClient: ServiceV1ServicePromiseClient }, v2: { serviceServicePromiseClient: ServiceV2ServicePromiseClient } };
  service_group: {
    v1: { serviceGroupServicePromiseClient: ServiceGroupV1ServicePromiseClient };
    v2: { serviceGroupServicePromiseClient: ServiceGroupV2ServicePromiseClient };
  };
  team: { v1: { teamServicePromiseClient: TeamV1ServicePromiseClient }, v2: { teamServicePromiseClient: TeamV2ServicePromiseClient } };
  user: { v1: { userServicePromiseClient: UserV1ServicePromiseClient }, v2: { userServicePromiseClient: UserV2ServicePromiseClient } };
};

const options = {
  unaryInterceptors: [new AuthInterceptor()],
  streamInterceptors: [new AuthInterceptor()],
};

export const gRPCClients: GRPCClients = {
  auth: {
    v1: {
      authServicePromiseClient: new AuthV1ServicePromiseClient(
        serverAddress,
        null,
        options
      ),
    },
    v2: {
      authServicePromiseClient: new AuthV2ServicePromiseClient(
        serverAddress,
        null,
        options
      ),
    }
  },
  check: {
    v1: {
      checkServicePromiseClient: new CheckV1ServicePromiseClient(
        serverAddress,
        null,
        options
      ),
    },
    v2: {
      checkServicePromiseClient: new CheckV2ServicePromiseClient(
        serverAddress,
        null,
        options
      ),
    },
  },
  competition: {
    v1: {
      competitionServicePromiseClient: new CompetitionV1ServicePromiseClient(
        serverAddress,
        null,
        options
      ),
    },
    v2: {
      competitionServicePromiseClient: new CompetitionV2ServicePromiseClient(
        serverAddress,
        null,
        options
      ),
    },
  },
  config: {
    v1: {
      dynamicConfigServicePromiseClient: new DynamicConfigV1ServicePromiseClient(
        serverAddress,
        null,
        options
      ),
      staticConfigServicePromiseClient: new StaticConfigV1ServicePromiseClient(
        serverAddress,
        null,
        options
      ),
    },
    v2: {
      dynamicConfigServicePromiseClient: new DynamicConfigV2ServicePromiseClient(
        serverAddress,
        null,
        options
      ),
      staticConfigServicePromiseClient: new StaticConfigV2ServicePromiseClient(
        serverAddress,
        null,
        options
      ),
    },
  },
  host: {
    v1: {
      hostServicePromiseClient: new HostV1ServicePromiseClient(
        serverAddress,
        null,
        options
      ),
    },
    v2: {
      hostServicePromiseClient: new HostV2ServicePromiseClient(
        serverAddress,
        null,
        options
      ),
    },
  },
  host_group: {
    v1: {
      hostGroupServicePromiseClient: new HostGroupV1ServicePromiseClient(
        serverAddress,
        null,
        options
      ),
    },
    v2: {
      hostGroupServicePromiseClient: new HostGroupV2ServicePromiseClient(
        serverAddress,
        null,
        options
      ),
    },
  },
  policy: {
    v1: {
      policyServicePromiseClient: new PolicyV1ServicePromiseClient(
        serverAddress,
        null,
        options
      ),
    },
    v2: {
      policyServicePromiseClient: new PolicyV2ServicePromiseClient(
        serverAddress,
        null,
        options
      ),
    },
  },
  property: {
    v1: {
      propertyServicePromiseClient: new PropertyV1ServicePromiseClient(
        serverAddress,
        null,
        options
      ),
    },
    v2: {
      propertyServicePromiseClient: new PropertyV2ServicePromiseClient(
        serverAddress,
        null,
        options
      ),
    },
  },
  report: {
    v1: {
      reportServicePromiseClient: new ReportV1ServicePromiseClient(
        serverAddress,
        null,
        options
      ),
    },
    v2: {
      reportServicePromiseClient: new ReportV2ServicePromiseClient(
        serverAddress,
        null,
        options
      ),
    },
  },
  round: {
    v1: {
      roundServicePromiseClient: new RoundV1ServicePromiseClient(
        serverAddress,
        null,
        options
      ),
    },
    v2: {
      roundServicePromiseClient: new RoundV2ServicePromiseClient(
        serverAddress,
        null,
        options
      ),
    },
  },
  service: {
    v1: {
      serviceServicePromiseClient: new ServiceV1ServicePromiseClient(
        serverAddress,
        null,
        options
      ),
    },
    v2: {
      serviceServicePromiseClient: new ServiceV2ServicePromiseClient(
        serverAddress,
        null,
        options
      ),
    },
  },
  service_group: {
    v1: {
      serviceGroupServicePromiseClient: new ServiceGroupV1ServicePromiseClient(
        serverAddress,
        null,
        options
      ),
    },
    v2: {
      serviceGroupServicePromiseClient: new ServiceGroupV2ServicePromiseClient(
        serverAddress,
        null,
        options
      ),
    },
  },
  team: {
    v1: {
      teamServicePromiseClient: new TeamV1ServicePromiseClient(
        serverAddress,
        null,
        options
      ),
    },
    v2: {
      teamServicePromiseClient: new TeamV2ServicePromiseClient(
        serverAddress,
        null,
        options
      ),
    },
  },
  user: {
    v1: {
      userServicePromiseClient: new UserV1ServicePromiseClient(
        serverAddress,
        null,
        options
      ),
    },
    v2: {
      userServicePromiseClient: new UserV2ServicePromiseClient(
        serverAddress,
        null,
        options
      ),
    },
  },
};
