import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  DeleteRequest,
  GetAllRequest,
  GetByIDRequest,
  HostGroup,
  StoreRequest,
  UpdateRequest,
} from "../scoretrakapis/scoretrak/host_group/v1/host_group_pb";
import grpcWeb from "grpc-web";
import { gRPCClients } from "../../grpc/gRPCClients";
import { UUID } from "../scoretrakapis/scoretrak/proto/v1/uuid_pb";

export function useHostGroupsQuery() {
  const fetchHostGroups = async () => {
    const hostGroupsResponse = await gRPCClients.hostGroupClient.getAll(
      new GetAllRequest(),
      {}
    );
    return hostGroupsResponse.getHostGroupsList();
  };

  return useQuery<HostGroup[], grpcWeb.RpcError>(
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
    const hostGroupResponse = await gRPCClients.hostGroupClient.getByID(
      request,
      {}
    );
    return hostGroupResponse.getHostGroup();
  };

  return useQuery<HostGroup | undefined, grpcWeb.RpcError>(
    ["host-groups", hostGroupId],
    () => fetchHostGroupById(hostGroupId)
  );
}

export function useAddHostGroupMutation() {
  const queryClient = useQueryClient();

  const addHostGroup = async (addHostGroupRequest: StoreRequest) => {
    return await gRPCClients.hostGroupClient.store(addHostGroupRequest, {});
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
    return await gRPCClients.hostGroupClient.update(updateHostGroupRequest, {});
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
    const deleteResponse = await gRPCClients.hostGroupClient.delete(
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
