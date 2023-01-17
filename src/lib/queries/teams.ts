import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  DeleteRequest,
  GetAllRequest,
  GetByIDRequest,
  Team,
  StoreRequest,
  UpdateRequest,
} from "@buf/scoretrak_scoretrakapis.grpc_web/scoretrak/team/v1/team_pb";
import grpcWeb from "grpc-web";
import { gRPCClients } from "../../grpc/gRPCClients";
import { UUID } from "@buf/scoretrak_scoretrakapis.grpc_web/scoretrak/proto/v1/uuid_pb";

export function useTeamsQuery() {
  const fetchTeams = async () => {
    const teamsResponse = await gRPCClients.team.v1.teamServicePromiseClient.getAll(
      new GetAllRequest(),
      {}
    );
    return teamsResponse.getTeamsList();
  };

  return useQuery<Team[], grpcWeb.RpcError, Team[], ["teams"]>(["teams"], fetchTeams);
}

export function useTeamQuery(teamId: string) {
  const fetchTeamById = async (id: string) => {
    const uuid = new UUID();
    uuid.setValue(id);
    const request = new GetByIDRequest();
    request.setId(uuid);
    const teamResponse = await gRPCClients.team.v1.teamServicePromiseClient.getByID(request, {});
    return teamResponse.getTeam();
  };

  return useQuery<Team | undefined, grpcWeb.RpcError, Team | undefined, ["teams"]>(["teams", teamId], () =>
    fetchTeamById(teamId)
  );
}

export function useAddTeamMutation() {
  const queryClient = useQueryClient();

  const addTeam = async (addTeamRequest: StoreRequest) => {
    return await gRPCClients.team.v1.teamServicePromiseClient.store(addTeamRequest, {});
  };

  return useMutation(addTeam, {
    onSuccess: () => {
      return queryClient.invalidateQueries(["teams"]);
    },
  });
}

export function useUpdateTeamMutation() {
  const queryClient = useQueryClient();

  const updateTeam = async (updateTeamRequest: UpdateRequest) => {
    return await gRPCClients.team.v1.teamServicePromiseClient.update(updateTeamRequest, {});
  };

  return useMutation(updateTeam, {
    onSuccess: () => {
      return queryClient.invalidateQueries(["teams"]);
    },
  });
}

export function useDeleteTeamMutation() {
  const queryClient = useQueryClient();

  const deleteTeam = async (deleteTeamRequest: DeleteRequest) => {
    await gRPCClients.team.v1.teamServicePromiseClient.delete(
      deleteTeamRequest,
      {}
    );
    return deleteTeamRequest.getId();
  };

  return useMutation(deleteTeam, {
    onSuccess: () => {
      return queryClient.invalidateQueries(["teams"]);
    },
  });
}
