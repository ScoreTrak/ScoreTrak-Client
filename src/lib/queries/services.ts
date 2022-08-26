import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  DeleteRequest,
  GetAllRequest,
  GetByIDRequest,
  Service,
  StoreRequest,
  UpdateRequest,
} from "../scoretrakapis/scoretrak/service/v1/service_pb";
import grpcWeb from "grpc-web";
import { gRPCClients } from "../../grpc/gRPCClients";
import { UUID } from "../scoretrakapis/scoretrak/proto/v1/uuid_pb";

export function useServicesQuery() {
  const fetchServices = async () => {
    const serviceResponse = await gRPCClients.serviceClient.getAll(
      new GetAllRequest(),
      {}
    );
    return serviceResponse.getServicesList();
  };

  return useQuery<Service[], grpcWeb.RpcError>(["services"], fetchServices);
}

export function useServiceQuery(serviceId: string) {
  const fetchServiceById = async (id: string) => {
    const uuid = new UUID();
    uuid.setValue(id);
    const request = new GetByIDRequest();
    request.setId(uuid);
    const serviceResponse = await gRPCClients.serviceClient.getByID(
      request,
      {}
    );
    return serviceResponse.getService();
  };

  return useQuery<Service | undefined, grpcWeb.RpcError>(
    ["services", serviceId],
    () => fetchServiceById(serviceId)
  );
}

export function useAddServiceMutation() {
  const queryClient = useQueryClient();

  const addService = async (addServiceRequest: StoreRequest) => {
    return await gRPCClients.serviceClient.store(addServiceRequest, {});
  };

  return useMutation(addService, {
    onSuccess: () => {
      return queryClient.invalidateQueries(["services"]);
    },
  });
}

export function useUpdateServiceMutation() {
  const queryClient = useQueryClient();

  const updateService = async (updateServiceRequest: UpdateRequest) => {
    return await gRPCClients.serviceClient.update(updateServiceRequest, {});
  };

  return useMutation(updateService, {
    onSuccess: () => {
      return queryClient.invalidateQueries(["services"]);
    },
  });
}

export function useDeleteServiceMutation() {
  const queryClient = useQueryClient();

  const deleteService = async (deleteServiceRequest: DeleteRequest) => {
    const deleteResponse = await gRPCClients.serviceClient.delete(
      deleteServiceRequest,
      {}
    );
    return deleteServiceRequest.getId();
  };

  return useMutation(deleteService, {
    onSuccess: () => {
      return queryClient.invalidateQueries(["services"]);
    },
  });
}
