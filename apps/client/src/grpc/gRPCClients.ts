import {token} from './token/token'

import {AuthServiceClient} from "../lib/scoretrakapis/scoretrak/auth/v1/AuthServiceClientPb"
import {CheckServiceClient} from "../lib/scoretrakapis/scoretrak/check/v1/CheckServiceClientPb";
import {CompetitionServiceClient} from "../lib/scoretrakapis/scoretrak/competition/v1/CompetitionServiceClientPb";
import {DynamicConfigServiceClient, StaticConfigServiceClient} from "../lib/scoretrakapis/scoretrak/config/v1/ConfigServiceClientPb";
import {HostServiceClient} from "../lib/scoretrakapis/scoretrak/host/v1/HostServiceClientPb";
import {HostGroupServiceClient} from "../lib/scoretrakapis/scoretrak/host_group/v1/Host_groupServiceClientPb";
import {PolicyServiceClient} from "../lib/scoretrakapis/scoretrak/policy/v1/PolicyServiceClientPb";
import {PropertyServiceClient} from "../lib/scoretrakapis/scoretrak/property/v1/PropertyServiceClientPb";
import {ReportServiceClient} from "../lib/scoretrakapis/scoretrak/report/v1/ReportServiceClientPb";
import {RoundServiceClient} from "../lib/scoretrakapis/scoretrak/round/v1/RoundServiceClientPb";
import {ServiceServiceClient} from "../lib/scoretrakapis/scoretrak/service/v1/ServiceServiceClientPb";
import {ServiceGroupServiceClient} from "../lib/scoretrakapis/scoretrak/service_group/v1/Service_groupServiceClientPb";
import {TeamServiceClient} from "../lib/scoretrakapis/scoretrak/team/v1/TeamServiceClientPb";
import {UserServiceClient} from "../lib/scoretrakapis/scoretrak/user/v1/UserServiceClientPb";

const serverAddress = process.env.PUBLIC_URL

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
            const metadata = request.getMetadata(undefined, undefined)
            metadata.authorization = token.getToken()
        }
        return invoker(request)
    }
}

const options = {
    unaryInterceptors: [new AuthInterceptor()],
    streamInterceptors: [new AuthInterceptor()]
}

export const gRPCClients: GRPCClients = {
    authClient: new AuthServiceClient(serverAddress, null, options),
    checkClient: new CheckServiceClient(serverAddress, null, options),
    competitionClient: new CompetitionServiceClient(serverAddress, null, options),
    dynamicConfigClient: new DynamicConfigServiceClient(serverAddress, null, options),
    staticConfigClient: new StaticConfigServiceClient(serverAddress, null, options),
    hostClient: new HostServiceClient(serverAddress, null, options),
    hostGroupClient: new HostGroupServiceClient(serverAddress, null, options),
    policyClient: new PolicyServiceClient(serverAddress, null, options),
    propertyClient: new PropertyServiceClient(serverAddress, null, options),
    reportClient: new ReportServiceClient(serverAddress, null, options),
    roundClient: new RoundServiceClient(serverAddress, null, options),
    serviceClient: new ServiceServiceClient(serverAddress, null, options),
    serviceGroupClient: new ServiceGroupServiceClient(serverAddress, null, options),
    teamClient: new TeamServiceClient(serverAddress, null, options),
    userClient: new UserServiceClient(serverAddress, null, options)
};