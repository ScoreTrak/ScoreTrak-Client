import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ServiceServiceDeleteRequest,
  ServiceServiceGetAllRequest,
  ServiceServiceGetByIDRequest,
  Service,
  ServiceServiceStoreRequest,
  ServiceServiceUpdateRequest,
} from "@buf/scoretrak_scoretrakapis.grpc_web/scoretrak/service/v2/service_pb";
import grpcWeb from "grpc-web";
import { gRPCClients } from "../../grpc/gRPCClients";
import { UUID } from "@buf/scoretrak_scoretrakapis.grpc_web/scoretrak/proto/v1/uuid_pb";

export function useServicesQuery() {
  const fetchServices = async () => {
    const serviceResponse = await gRPCClients.service.v2.serviceServicePromiseClient.getAll(
      new ServiceServiceGetAllRequest()
    );
    return serviceResponse.getServicesList();
  };

  return useQuery<Service[], grpcWeb.RpcError, Service[]>(["services"], fetchServices);
}

export function useServiceQuery(serviceId: string) {
  const fetchServiceById = async (id: string) => {
    const uuid = new UUID();
    uuid.setValue(id);
    const request = new ServiceServiceGetByIDRequest();
    request.setId(uuid);
    const serviceResponse = await gRPCClients.service.v2.serviceServicePromiseClient.getByID(
      request
    );
    return serviceResponse.getService();
  };

  return useQuery<Service | undefined, grpcWeb.RpcError, Service | undefined>(
    ["services", serviceId],
    () => fetchServiceById(serviceId)
  );
}

export function useAddServiceMutation() {
  const queryClient = useQueryClient();

  const addService = async (addServiceRequest: ServiceServiceStoreRequest) => {
    return await gRPCClients.service.v2.serviceServicePromiseClient.store(addServiceRequest);
  };

  return useMutation(addService, {
    onSuccess: () => {
      return queryClient.invalidateQueries(["services"]);
    },
  });
}

export function useUpdateServiceMutation() {
  const queryClient = useQueryClient();

  const updateService = async (updateServiceRequest: ServiceServiceUpdateRequest) => {
    return await gRPCClients.service.v2.serviceServicePromiseClient.update(updateServiceRequest);
  };

  return useMutation(updateService, {
    onSuccess: () => {
      return queryClient.invalidateQueries(["services"]);
    },
  });
}

export function useDeleteServiceMutation() {
  const queryClient = useQueryClient();

  const deleteService = async (deleteServiceRequest: ServiceServiceDeleteRequest) => {
    await gRPCClients.service.v2.serviceServicePromiseClient.delete(
      deleteServiceRequest
    );
    return deleteServiceRequest.getId();
  };

  return useMutation(deleteService, {
    onSuccess: () => {
      return queryClient.invalidateQueries(["services"]);
    },
  });
}

