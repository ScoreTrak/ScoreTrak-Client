import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  HostServiceDeleteRequest,
  HostServiceGetAllRequest,
  HostServiceGetByIDRequest,
  Host,
  HostServiceStoreRequest, HostServiceStoreResponse,
  HostServiceUpdateRequest, HostServiceUpdateResponse
} from "@buf/scoretrak_scoretrakapis.grpc_web/scoretrak/host/v2/host_pb";
import grpcWeb from "grpc-web";
import { gRPCClients } from "../../grpc/gRPCClients";
import { UUID } from "@buf/scoretrak_scoretrakapis.grpc_web/scoretrak/proto/v1/uuid_pb";

export function useHostsQuery() {
  const fetchHosts = async () => {
    const hostsResponse = await gRPCClients.host.v2.hostServicePromiseClient.getAll(
      new HostServiceGetAllRequest()
    );
    return hostsResponse.getHostsList();
  };

  return useQuery<Host[], grpcWeb.RpcError>(["hosts"], fetchHosts);
}

export function useHostQuery(hostId: string) {
  const fetchHostById = async (id: string) => {
    const uuid = new UUID();
    uuid.setValue(id);
    const request = new HostServiceGetByIDRequest();
    request.setId(uuid);
    const hostResponse = await gRPCClients.host.v2.hostServicePromiseClient.getByID(request);
    return hostResponse.getHost();
  };

  return useQuery<Host | undefined, grpcWeb.RpcError>(["hosts", hostId], () =>
    fetchHostById(hostId)
  );
}

export function useAddHostMutation() {
  const queryClient = useQueryClient();

  const addHost = async (addHostRequest: HostServiceStoreRequest) => {
    return await gRPCClients.host.v2.hostServicePromiseClient.store(addHostRequest);
  };

  return useMutation<HostServiceStoreResponse, grpcWeb.RpcError, HostServiceStoreRequest, grpcWeb.RpcError>(addHost, {
    onSuccess: () => {
      return queryClient.invalidateQueries(["hosts"]);
    },
  });
}

export function useUpdateHostMutation() {
  const queryClient = useQueryClient();

  const updateHost = async (updateHostRequest: HostServiceUpdateRequest) => {
    return await gRPCClients.host.v2.hostServicePromiseClient.update(updateHostRequest);
  };

  return useMutation<HostServiceUpdateResponse, grpcWeb.RpcError, HostServiceUpdateRequest, grpcWeb.RpcError>(updateHost, {
    onSuccess: () => {
      return queryClient.invalidateQueries(["hosts"]);
    },
  });
}

export function useDeleteHostMutation() {
  const queryClient = useQueryClient();

  const deleteHost = async (deleteHostRequest: HostServiceDeleteRequest) => {
    await gRPCClients.host.v2.hostServicePromiseClient.delete(
      deleteHostRequest
    );
    return deleteHostRequest.getId();
  };

  return useMutation<UUID | undefined, grpcWeb.RpcError, HostServiceDeleteRequest>(deleteHost, {
    onSuccess: () => {
      return queryClient.invalidateQueries(["hosts"]);
    },
  });
}
