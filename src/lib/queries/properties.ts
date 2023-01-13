import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  DeleteRequest,
  GetAllByServiceIDRequest,
  GetAllRequest,
  Property,
  StoreRequest,
  UpdateRequest,
} from "@buf/grpc_web_scoretrak_scoretrakapis/scoretrak/property/v1/property_pb";
import grpcWeb from "grpc-web";
import { gRPCClients } from "../../grpc/gRPCClients";
import { UUID } from "@buf/grpc_web_scoretrak_scoretrakapis/scoretrak/proto/v1/uuid_pb";

export function usePropertiesQuery() {
  const fetchProperties = async () => {
    const propertiesResponse = await gRPCClients.property.v1.propertyServicePromiseClient.getAll(
      new GetAllRequest(),
      {}
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
    const request = new GetAllByServiceIDRequest();
    request.setServiceId(uuid);
    const propertiesResponse =
      await gRPCClients.property.v1.propertyServicePromiseClient.getAllByServiceID(request, {});
    return propertiesResponse.getPropertiesList();
  };

  return useQuery<Property[], grpcWeb.RpcError, Property[], ["properties"]>(["properties", serviceId], () =>
    fetchPropertiesByServiceId(serviceId)
  );
}

export function useAddPropertyMutation() {
  const queryClient = useQueryClient();

  const addProperty = async (addPropertyRequest: StoreRequest) => {
    return await gRPCClients.property.v1.propertyServicePromiseClient.store(addPropertyRequest, {});
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
    return await gRPCClients.property.v1.propertyServicePromiseClient.update(updatePropertyRequest, {});
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
    await gRPCClients.property.v1.propertyServicePromiseClient.delete(deletePropertyRequest, {});
    return deletePropertyRequest.getServiceId();
  };

  return useMutation(deleteProperty, {
    onSuccess: () => {
      return queryClient.invalidateQueries(["properties"]);
    },
  });
}
