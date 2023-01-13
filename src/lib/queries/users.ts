import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  DeleteRequest,
  GetAllRequest,
  GetByIDRequest,
  User,
  StoreRequest,
  UpdateRequest, StoreResponse, DeleteResponse, UpdateResponse
} from "@buf/grpc_web_scoretrak_scoretrakapis/scoretrak/user/v1/user_pb";
import grpcWeb from "grpc-web";
import { gRPCClients } from "../../grpc/gRPCClients";
import { UUID } from "@buf/grpc_web_scoretrak_scoretrakapis/scoretrak/proto/v1/uuid_pb";

export function useUsersQuery() {
  const fetchUsers = async () => {
    const userResponse = await gRPCClients.user.v1.userServicePromiseClient.getAll(
      new GetAllRequest(),
      {}
    );
    return userResponse.getUsersList();
  };

  return useQuery<User[], grpcWeb.RpcError, User[], ["users"]>(["users"], fetchUsers);
}

export function useUserQuery(userId: string) {
  const fetchUserById = async (id: string) => {
    const uuid = new UUID();
    uuid.setValue(id);
    const request = new GetByIDRequest();
    request.setId(uuid);
    const userResponse = await gRPCClients.user.v1.userServicePromiseClient.getByID(request, {});
    return userResponse.getUser();
  };

  return useQuery<User | undefined, grpcWeb.RpcError, User | undefined, ["users"]>(["users", userId], () =>
    fetchUserById(userId)
  );
}

export function useAddUserMutation() {
  const queryClient = useQueryClient();

  const addUser = async (addUserRequest: StoreRequest) => {
    return await gRPCClients.user.v1.userServicePromiseClient.store(addUserRequest, {});
  };

  return useMutation<StoreResponse, grpcWeb.RpcError, StoreRequest, grpcWeb.RpcError>(addUser, {
    onSuccess: () => {
      return queryClient.invalidateQueries(["users"]);
    },
  });
}

export function useUpdateUserMutation() {
  const queryClient = useQueryClient();

  const updateUser = async (updateUserRequest: UpdateRequest) => {
    return await gRPCClients.user.v1.userServicePromiseClient.update(updateUserRequest, {});
  };

  return useMutation<UpdateResponse, grpcWeb.RpcError, UpdateRequest>(updateUser, {
    onSuccess: () => {
      return queryClient.invalidateQueries(["users"]);
    },
  });
}

export function useDeleteUserMutation() {
  const queryClient = useQueryClient();

  const deleteUser = async (deleteUserRequest: DeleteRequest) => {
    await gRPCClients.user.v1.userServicePromiseClient.delete(
      deleteUserRequest,
      {}
    );
    return deleteUserRequest.getId();
  };

  return useMutation<UUID | undefined, grpcWeb.RpcError, DeleteRequest>(deleteUser, {
    onSuccess: () => {
      return queryClient.invalidateQueries(["users"]);
    },
  });
}
