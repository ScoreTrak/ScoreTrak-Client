import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  DeleteRequest,
  GetAllByServiceIDRequest,
  GetAllRequest,
  Property,
  StoreRequest,
  UpdateRequest,
} from "../scoretrakapis/scoretrak/property/v1/property_pb";
import grpcWeb from "grpc-web";
import { gRPCClients } from "../../grpc/gRPCClients";
import { UUID } from "../scoretrakapis/scoretrak/proto/v1/uuid_pb";

export function usePropertiesQuery() {
  const fetchProperties = async () => {
    const propertiesResponse = await gRPCClients.propertyClient.getAll(
      new GetAllRequest(),
      {}
    );
    return propertiesResponse.getPropertiesList();
  };

  return useQuery<Property[], grpcWeb.RpcError>(
    ["properties"],
    fetchProperties
  );
}

export function usePropertiesByServiceIdQuery(serviceId: string) {
  const fetchPropertiesByServiceId = async (id: string) => {
    const uuid = new UUID();
    uuid.setValue(id);
    const request = new GetAllByServiceIDRequest();
    request.setServiceId(uuid);
    const propertiesResponse =
      await gRPCClients.propertyClient.getAllByServiceID(request, {});
    return propertiesResponse.getPropertiesList();
  };

  return useQuery<Property[], grpcWeb.RpcError>(["properties", serviceId], () =>
    fetchPropertiesByServiceId(serviceId)
  );
}

export function useAddPropertyMutation() {
  const queryClient = useQueryClient();

  const addProperty = async (addPropertyRequest: StoreRequest) => {
    return await gRPCClients.propertyClient.store(addPropertyRequest, {});
  };

  return useMutation(addProperty, {
    onSuccess: () => {
      return queryClient.invalidateQueries(["properties"]);
    },
  });
}

export function useUpdatePropertyMutation() {
  const queryClient = useQueryClient();

  const updateProperty = async (updatePropertyRequest: UpdateRequest) => {
    return await gRPCClients.propertyClient.update(updatePropertyRequest, {});
  };

  return useMutation(updateProperty, {
    onSuccess: () => {
      return queryClient.invalidateQueries(["properties"]);
    },
  });
}

export function useDeletePropertyMutation() {
  const queryClient = useQueryClient();

  const deleteProperty = async (deletePropertyRequest: DeleteRequest) => {
    await gRPCClients.propertyClient.delete(deletePropertyRequest, {});
    return deletePropertyRequest.getServiceId();
  };

  return useMutation(deleteProperty, {
    onSuccess: () => {
      return queryClient.invalidateQueries(["properties"]);
    },
  });
}
