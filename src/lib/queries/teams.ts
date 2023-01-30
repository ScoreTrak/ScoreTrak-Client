import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  TeamServiceDeleteRequest,
  TeamServiceGetAllRequest,
  TeamServiceGetByIDRequest,
  Team,
  TeamServiceStoreRequest,
  TeamServiceUpdateRequest, TeamServiceStoreResponse
} from "@buf/scoretrak_scoretrakapis.grpc_web/scoretrak/team/v2/team_pb";
import grpcWeb from "grpc-web";
import { gRPCClients } from "../grpc/gRPCClients";
import { UUID } from "@buf/scoretrak_scoretrakapis.grpc_web/scoretrak/proto/v1/uuid_pb";

export function useTeamsQuery() {
  const fetchTeams = async () => {
    const teamsResponse = await gRPCClients.team.v2.teamServicePromiseClient.getAll(
      new TeamServiceGetAllRequest()
    );
    return teamsResponse.getTeamsList();
  };

  return useQuery<Team[], grpcWeb.RpcError, Team[], ["teams"]>(["teams"], fetchTeams);
}

export function useTeamQuery(teamId: string) {
  const fetchTeamById = async (id: string) => {
    const uuid = new UUID();
    uuid.setValue(id);
    const request = new TeamServiceGetByIDRequest();
    request.setId(uuid);
    const teamResponse = await gRPCClients.team.v2.teamServicePromiseClient.getByID(request);
    return teamResponse.getTeam();
  };

  return useQuery<Team | undefined, grpcWeb.RpcError, Team | undefined, ["teams"]>(["teams", teamId], () =>
    fetchTeamById(teamId)
  );
}

export function useAddTeamMutation() {
  const queryClient = useQueryClient();

  const addTeam = async (addTeamRequest: TeamServiceStoreRequest) => {
    return await gRPCClients.team.v2.teamServicePromiseClient.store(addTeamRequest);
  };

  return useMutation<TeamServiceStoreResponse, grpcWeb.RpcError>(addTeam, {
    onSuccess: () => {
      return queryClient.invalidateQueries(["teams"]);
    },
  });
}

export function useUpdateTeamMutation() {
  const queryClient = useQueryClient();

  const updateTeam = async (updateTeamRequest: TeamServiceUpdateRequest) => {
    return await gRPCClients.team.v2.teamServicePromiseClient.update(updateTeamRequest);
  };

  return useMutation(updateTeam, {
    onSuccess: () => {
      return queryClient.invalidateQueries(["teams"]);
    },
  });
}

export function useDeleteTeamMutation() {
  const queryClient = useQueryClient();

  const deleteTeam = async (deleteTeamRequest: TeamServiceDeleteRequest) => {
    await gRPCClients.team.v2.teamServicePromiseClient.delete(
      deleteTeamRequest
    );
    return deleteTeamRequest.getId();
  };

  return useMutation(deleteTeam, {
    onSuccess: () => {
      return queryClient.invalidateQueries(["teams"]);
    },
  });
}
