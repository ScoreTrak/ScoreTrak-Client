import { useQuery } from "@tanstack/react-query";
import grpcWeb from "grpc-web";
import { gRPCClients } from "../../grpc/gRPCClients";
import { UUID } from "@buf/scoretrak_scoretrakapis.grpc_web/scoretrak/proto/v1/uuid_pb";
import { Check, CheckServiceGetAllByServiceIDRequest } from "@buf/scoretrak_scoretrakapis.grpc_web/scoretrak/check/v2/check_pb";

export function useChecksByServiceIDQuery(serviceID: string) {
  const fetchChecks = async (id: string) => {
    const serviceUUID = new UUID()
    serviceUUID.setValue(id)
    const checksByServiceIdRequest = new CheckServiceGetAllByServiceIDRequest()
    checksByServiceIdRequest.setServiceId(serviceUUID)
    const checksResponse = await gRPCClients.check.v2.checkServicePromiseClient.getAllByServiceID(
      checksByServiceIdRequest
    );
    return checksResponse.getChecksList();
  };

  return useQuery<Check[], grpcWeb.RpcError, Check[], ["checks"]>(["checks", serviceID], () => fetchChecks(serviceID));
}