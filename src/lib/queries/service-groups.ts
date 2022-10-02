import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  DeleteRequest,
  GetAllRequest,
  GetByIDRequest,
  ServiceGroup,
  StoreRequest,
  UpdateRequest,
} from "@buf/grpc_web_scoretrak_scoretrakapis/scoretrak/service_group/v1/service_group_pb";
import grpcWeb from "grpc-web";
import { gRPCClients } from "../../grpc/gRPCClients";
import { UUID } from "@buf/grpc_web_scoretrak_scoretrakapis/scoretrak/proto/v1/uuid_pb";

export function useServiceGroupsQuery() {
  const fetchServiceGroups = async () => {
    const serviceGroupsResponse = await gRPCClients.service_group.v1.serviceGroupServicePromiseClient.getAll(
      new GetAllRequest(),
      {}
    );
    return serviceGroupsResponse.getServiceGroupsList();
  };

  return useQuery<ServiceGroup[], grpcWeb.RpcError>(
    ["service-groups"],
    fetchServiceGroups
  );
}

export function useServiceGroupQuery(serviceGroupId: string) {
  const fetchServiceGroupById = async (id: string) => {
    const uuid = new UUID();
    uuid.setValue(id);
    const request = new GetByIDRequest();
    request.setId(uuid);
    const serviceGroupResponse = await gRPCClients.service_group.v1.serviceGroupServicePromiseClient.getByID(
      request,
      {}
    );
    return serviceGroupResponse.getServiceGroup();
  };

  return useQuery<ServiceGroup | undefined, grpcWeb.RpcError>(
    ["service-groups", serviceGroupId],
    () => fetchServiceGroupById(serviceGroupId)
  );
}

export function useAddServiceGroupMutation() {
  const queryClient = useQueryClient();

  const addServiceGroup = async (addServiceGroupRequest: StoreRequest) => {
    return await gRPCClients.service_group.v1.serviceGroupServicePromiseClient.store(
      addServiceGroupRequest,
      {}
    );
  };

  return useMutation(addServiceGroup, {
    onSuccess: () => {
      return queryClient.invalidateQueries(["serviceGroups"]);
    },
  });
}

export function useUpdateServiceGroupMutation() {
  const queryClient = useQueryClient();

  const updateServiceGroup = async (
    updateServiceGroupRequest: UpdateRequest
  ) => {
    return await gRPCClients.service_group.v1.serviceGroupServicePromiseClient.update(
      updateServiceGroupRequest,
      {}
    );
  };

  return useMutation(updateServiceGroup, {
    onSuccess: () => {
      return queryClient.invalidateQueries(["service-groups"]);
    },
  });
}

export function useDeleteServiceGroupMutation() {
  const queryClient = useQueryClient();

  const deleteServiceGroup = async (
    deleteServiceGroupRequest: DeleteRequest
  ) => {
    await gRPCClients.service_group.v1.serviceGroupServicePromiseClient.delete(
      deleteServiceGroupRequest,
      {}
    );
    return deleteServiceGroupRequest.getId();
  };

  return useMutation(deleteServiceGroup, {
    onSuccess: () => {
      return queryClient.invalidateQueries(["service-groups"]);
    },
  });
}
