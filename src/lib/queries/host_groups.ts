import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  DeleteRequest,
  GetAllRequest,
  GetByIDRequest,
  HostGroup,
  StoreRequest,
  UpdateRequest,
} from "@buf/scoretrak_scoretrakapis.grpc_web/scoretrak/host_group/v1/host_group_pb";
import grpcWeb from "grpc-web";
import { gRPCClients } from "../../grpc/gRPCClients";
import { UUID } from "@buf/scoretrak_scoretrakapis.grpc_web/scoretrak/proto/v1/uuid_pb";

export function useHostGroupsQuery() {
  const fetchHostGroups = async () => {
    const hostGroupsResponse = await gRPCClients.host_group.v1.hostGroupServicePromiseClient.getAll(
      new GetAllRequest(),
      {}
    );
    return hostGroupsResponse.getHostGroupsList();
  };

  return useQuery<HostGroup[], grpcWeb.RpcError, HostGroup[]>(
    ["host-groups"],
    fetchHostGroups
  );
}

export function useHostGroupQuery(hostGroupId: string) {
  const fetchHostGroupById = async (id: string) => {
    const uuid = new UUID();
    uuid.setValue(id);
    const request = new GetByIDRequest();
    request.setId(uuid);
    const hostGroupResponse = await gRPCClients.host_group.v1.hostGroupServicePromiseClient.getByID(
      request,
      {}
    );
    return hostGroupResponse.getHostGroup();
  };

  return useQuery<HostGroup | undefined, grpcWeb.RpcError, HostGroup | undefined>(
    ["host-groups", hostGroupId],
    () => fetchHostGroupById(hostGroupId)
  );
}

export function useAddHostGroupMutation() {
  const queryClient = useQueryClient();

  const addHostGroup = async (addHostGroupRequest: StoreRequest) => {
    return await gRPCClients.host_group.v1.hostGroupServicePromiseClient.store(addHostGroupRequest, {});
  };

  return useMutation(addHostGroup, {
    onSuccess: () => {
      return queryClient.invalidateQueries(["host-groups"]);
    },
  });
}

export function useUpdateHostGroupMutation() {
  const queryClient = useQueryClient();

  const updateHostGroup = async (updateHostGroupRequest: UpdateRequest) => {
    return await gRPCClients.host_group.v1.hostGroupServicePromiseClient.update(updateHostGroupRequest, {});
  };

  return useMutation(updateHostGroup, {
    onSuccess: () => {
      return queryClient.invalidateQueries(["host-groups"]);
    },
  });
}

export function useDeleteHostGroupMutation() {
  const queryClient = useQueryClient();

  const deleteHostGroup = async (deleteHostGroupRequest: DeleteRequest) => {
    await gRPCClients.host_group.v1.hostGroupServicePromiseClient.delete(
      deleteHostGroupRequest,
      {}
    );
    return deleteHostGroupRequest.getId();
  };

  return useMutation(deleteHostGroup, {
    onSuccess: () => {
      return queryClient.invalidateQueries(["host-groups"]);
    },
  });
}
