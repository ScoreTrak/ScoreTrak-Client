import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  DeleteRequest,
  GetAllRequest,
  GetByIDRequest,
  User,
  StoreRequest,
  UpdateRequest,
} from "../scoretrakapis/scoretrak/user/v1/user_pb";
import grpcWeb from "grpc-web";
import { gRPCClients } from "../../grpc/gRPCClients";
import { UUID } from "../scoretrakapis/scoretrak/proto/v1/uuid_pb";

export function useUsersQuery() {
  const fetchUsers = async () => {
    const userResponse = await gRPCClients.userClient.getAll(
      new GetAllRequest(),
      {}
    );
    return userResponse.getUsersList();
  };

  return useQuery<User[], grpcWeb.RpcError>(["users"], fetchUsers);
}

export function useUserQuery(userId: string) {
  const fetchUserById = async (id: string) => {
    const uuid = new UUID();
    uuid.setValue(id);
    const request = new GetByIDRequest();
    request.setId(uuid);
    const userResponse = await gRPCClients.userClient.getByID(request, {});
    return userResponse.getUser();
  };

  return useQuery<User | undefined, grpcWeb.RpcError>(["users", userId], () =>
    fetchUserById(userId)
  );
}

export function useAddUserMutation() {
  const queryClient = useQueryClient();

  const addUser = async (addUserRequest: StoreRequest) => {
    return await gRPCClients.userClient.store(addUserRequest, {});
  };

  return useMutation(addUser, {
    onSuccess: () => {
      return queryClient.invalidateQueries(["users"]);
    },
  });
}

export function useUpdateUserMutation() {
  const queryClient = useQueryClient();

  const updateUser = async (updateUserRequest: UpdateRequest) => {
    return await gRPCClients.userClient.update(updateUserRequest, {});
  };

  return useMutation(updateUser, {
    onSuccess: () => {
      return queryClient.invalidateQueries(["users"]);
    },
  });
}

export function useDeleteUserMutation() {
  const queryClient = useQueryClient();

  const deleteUser = async (deleteUserRequest: DeleteRequest) => {
    const deleteResponse = await gRPCClients.userClient.delete(
      deleteUserRequest,
      {}
    );
    return deleteUserRequest.getId();
  };

  return useMutation(deleteUser, {
    onSuccess: () => {
      return queryClient.invalidateQueries(["users"]);
    },
  });
}
