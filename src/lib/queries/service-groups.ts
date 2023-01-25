import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ServiceGroupServiceDeleteRequest,
  ServiceGroupServiceGetAllRequest,
  ServiceGroupServiceGetByIDRequest,
  ServiceGroup,
  ServiceGroupServiceStoreRequest,
  ServiceGroupServiceUpdateRequest,
} from "@buf/scoretrak_scoretrakapis.grpc_web/scoretrak/service_group/v2/service_group_pb";
import grpcWeb from "grpc-web";
import { gRPCClients } from "../../grpc/gRPCClients";
import { UUID } from "@buf/scoretrak_scoretrakapis.grpc_web/scoretrak/proto/v1/uuid_pb";

export function useServiceGroupsQuery() {
  const fetchServiceGroups = async () => {
    const serviceGroupsResponse = await gRPCClients.service_group.v2.serviceGroupServicePromiseClient.getAll(
      new ServiceGroupServiceGetAllRequest(),
      {}
    );
    return serviceGroupsResponse.getServiceGroupsList();
  };

  return useQuery<ServiceGroup[], grpcWeb.RpcError, ServiceGroup[]>(
    ["service-groups"],
    fetchServiceGroups
  );
}

export function useServiceGroupQuery(serviceGroupId: string) {
  const fetchServiceGroupById = async (id: string) => {
    const uuid = new UUID();
    uuid.setValue(id);
    const request = new ServiceGroupServiceGetByIDRequest();
    request.setId(uuid);
    const serviceGroupResponse = await gRPCClients.service_group.v2.serviceGroupServicePromiseClient.getByID(
      request,
      {}
    );
    return serviceGroupResponse.getServiceGroup();
  };

  return useQuery<ServiceGroup | undefined, grpcWeb.RpcError, ServiceGroup | undefined>(
    ["service-groups", serviceGroupId],
    () => fetchServiceGroupById(serviceGroupId)
  );
}

export function useAddServiceGroupMutation() {
  const queryClient = useQueryClient();

  const addServiceGroup = async (addServiceGroupRequest: ServiceGroupServiceStoreRequest) => {
    return await gRPCClients.service_group.v2.serviceGroupServicePromiseClient.store(
      addServiceGroupRequest,
      {}
    );
  };

  return useMutation(addServiceGroup, {
    onSuccess: () => {
      return queryClient.invalidateQueries(["service-groups"]);
    },
  });
}

export function useUpdateServiceGroupMutation() {
  const queryClient = useQueryClient();

  const updateServiceGroup = async (
    updateServiceGroupRequest: ServiceGroupServiceUpdateRequest
  ) => {
    return await gRPCClients.service_group.v2.serviceGroupServicePromiseClient.update(
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
    deleteServiceGroupRequest: ServiceGroupServiceDeleteRequest
  ) => {
    await gRPCClients.service_group.v2.serviceGroupServicePromiseClient.delete(
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
