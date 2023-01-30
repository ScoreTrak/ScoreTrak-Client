import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  UserServiceDeleteRequest,
  UserServiceGetAllRequest,
  UserServiceGetByIDRequest,
  User,
  UserServiceStoreRequest,
  UserServiceUpdateRequest, UserServiceStoreResponse, UserServiceUpdateResponse
} from "@buf/scoretrak_scoretrakapis.grpc_web/scoretrak/user/v2/user_pb";
import grpcWeb from "grpc-web";
import { gRPCClients } from "../grpc/gRPCClients";
import { UUID } from "@buf/scoretrak_scoretrakapis.grpc_web/scoretrak/proto/v1/uuid_pb";

export function useUsersQuery() {
  const fetchUsers = async () => {
    const userResponse = await gRPCClients.user.v2.userServicePromiseClient.getAll(
      new UserServiceGetAllRequest()
    );
    return userResponse.getUsersList();
  };

  return useQuery<User[], grpcWeb.RpcError, User[], ["users"]>(["users"], fetchUsers);
}

export function useUserQuery(userId: string) {
  const fetchUserById = async (id: string) => {
    const uuid = new UUID();
    uuid.setValue(id);
    const request = new UserServiceGetByIDRequest();
    request.setId(uuid);
    const userResponse = await gRPCClients.user.v2.userServicePromiseClient.getByID(request);
    return userResponse.getUser();
  };

  return useQuery<User | undefined, grpcWeb.RpcError, User | undefined, ["users"]>(["users", userId], () =>
    fetchUserById(userId)
  );
}

export function useAddUserMutation() {
  const queryClient = useQueryClient();

  const addUser = async (addUserRequest: UserServiceStoreRequest) => {
    return await gRPCClients.user.v2.userServicePromiseClient.store(addUserRequest);
  };

  return useMutation<UserServiceStoreResponse, grpcWeb.RpcError, UserServiceStoreRequest, grpcWeb.RpcError>(addUser, {
    onSuccess: () => {
      return queryClient.invalidateQueries(["users"]);
    },
  });
}

export function useUpdateUserMutation() {
  const queryClient = useQueryClient();

  const updateUser = async (updateUserRequest: UserServiceUpdateRequest) => {
    return await gRPCClients.user.v2.userServicePromiseClient.update(updateUserRequest);
  };

  return useMutation<UserServiceUpdateResponse, grpcWeb.RpcError, UserServiceUpdateRequest>(updateUser, {
    onSuccess: () => {
      return queryClient.invalidateQueries(["users"]);
    },
  });
}

export function useDeleteUserMutation() {
  const queryClient = useQueryClient();

  const deleteUser = async (deleteUserRequest: UserServiceDeleteRequest) => {
    await gRPCClients.user.v2.userServicePromiseClient.delete(
      deleteUserRequest
    );
    return deleteUserRequest.getId();
  };

  return useMutation<UUID | undefined, grpcWeb.RpcError, UserServiceDeleteRequest>(deleteUser, {
    onSuccess: () => {
      return queryClient.invalidateQueries(["users"]);
    },
  });
}
