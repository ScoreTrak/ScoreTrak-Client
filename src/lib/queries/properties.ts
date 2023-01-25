import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  PropertyServiceDeleteRequest,
  PropertyServiceGetAllByServiceIDRequest,
  PropertyServiceGetAllRequest,
  Property,
  PropertyServiceStoreRequest,
  PropertyServiceUpdateRequest,
} from "@buf/scoretrak_scoretrakapis.grpc_web/scoretrak/property/v2/property_pb";
import grpcWeb from "grpc-web";
import { gRPCClients } from "../../grpc/gRPCClients";
import { UUID } from "@buf/scoretrak_scoretrakapis.grpc_web/scoretrak/proto/v1/uuid_pb";

export function usePropertiesQuery() {
  const fetchProperties = async () => {
    const propertiesResponse = await gRPCClients.property.v2.propertyServicePromiseClient.getAll(
      new PropertyServiceGetAllRequest()
    );
    return propertiesResponse.getPropertiesList();
  };

  return useQuery<Property[], grpcWeb.RpcError, Property[], ["properties"]>(
    ["properties"],
    fetchProperties
  );
}

export function usePropertiesByServiceIdQuery(serviceId: string) {
  const fetchPropertiesByServiceId = async (id: string) => {
    const uuid = new UUID();
    uuid.setValue(id);
    const request = new PropertyServiceGetAllByServiceIDRequest();
    request.setServiceId(uuid);
    const propertiesResponse =
      await gRPCClients.property.v2.propertyServicePromiseClient.getAllByServiceID(request);
    return propertiesResponse.getPropertiesList();
  };

  return useQuery<Property[], grpcWeb.RpcError, Property[], ["properties"]>(["properties", serviceId], () =>
    fetchPropertiesByServiceId(serviceId)
  );
}

export function useAddPropertyMutation() {
  const queryClient = useQueryClient();

  const addProperty = async (addPropertyRequest: PropertyServiceStoreRequest) => {
    return await gRPCClients.property.v2.propertyServicePromiseClient.store(addPropertyRequest);
  };

  return useMutation(addProperty, {
    onSuccess: () => {
      return queryClient.invalidateQueries(["properties"]);
    },
  });
}

export function useUpdatePropertyMutation() {
  const queryClient = useQueryClient();

  const updateProperty = async (updatePropertyRequest: PropertyServiceUpdateRequest) => {
    return await gRPCClients.property.v2.propertyServicePromiseClient.update(updatePropertyRequest);
  };

  return useMutation(updateProperty, {
    onSuccess: () => {
      return queryClient.invalidateQueries(["properties"]);
    },
  });
}

export function useDeletePropertyMutation() {
  const queryClient = useQueryClient();

  const deleteProperty = async (deletePropertyRequest: PropertyServiceDeleteRequest) => {
    await gRPCClients.property.v2.propertyServicePromiseClient.delete(deletePropertyRequest);
    return deletePropertyRequest.getServiceId();
  };

  return useMutation(deleteProperty, {
    onSuccess: () => {
      return queryClient.invalidateQueries(["properties"]);
    },
  });
}
