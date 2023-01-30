import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { gRPCClients } from "../grpc/gRPCClients";
import {
  Competition,
  CompetitionServiceDeleteCompetitionRequest,
  CompetitionServiceDeleteCompetitionResponse,
  CompetitionServiceFetchCoreCompetitionRequest,
  CompetitionServiceFetchCoreCompetitionResponse,
  CompetitionServiceFetchEntireCompetitionRequest,
  CompetitionServiceFetchEntireCompetitionResponse,
  CompetitionServiceLoadCompetitionRequest,
  CompetitionServiceLoadCompetitionResponse,
  CompetitionServiceResetScoresRequest,
  CompetitionServiceResetScoresResponse
} from "@buf/scoretrak_scoretrakapis.grpc_web/scoretrak/competition/v2/competition_pb";
import grpcWeb from "grpc-web";
import { Severity } from "~/types/types";
import { useSnackbar } from "notistack";
import { SnackbarDismissButton } from "~/components/SnackbarDismissButton";


export function useCoreCompetitionQuery() {
  const fetchCoreCompetition = async () => {
    return await gRPCClients.competition.v2.competitionServicePromiseClient.fetchCoreCompetition(new CompetitionServiceFetchCoreCompetitionRequest())
  }

  return useQuery<CompetitionServiceFetchCoreCompetitionResponse, grpcWeb.RpcError, CompetitionServiceFetchCoreCompetitionResponse>(["competition", "core"], fetchCoreCompetition)
}

export function useEntireCompetitionQuery() {
  const fetchEntireCompetition = async () => {
    return await gRPCClients.competition.v2.competitionServicePromiseClient.fetchEntireCompetition(new CompetitionServiceFetchEntireCompetitionRequest())
  }

  return useQuery<CompetitionServiceFetchEntireCompetitionResponse, grpcWeb.RpcError, CompetitionServiceFetchEntireCompetitionResponse>(["competition", "entire"], fetchEntireCompetition)
}

export function useLoadCompetitionMutation() {
  const queryClient = useQueryClient();
  const {enqueueSnackbar} = useSnackbar()

  const loadCompetition = async (competition: Competition) => {
    return await gRPCClients.competition.v2.competitionServicePromiseClient.loadCompetition(new CompetitionServiceLoadCompetitionRequest().setCompetition(competition))
  }

  return useMutation<CompetitionServiceLoadCompetitionResponse, grpcWeb.RpcError, Competition>(loadCompetition, {
    onSuccess: () => {
      enqueueSnackbar("Success Loading Competition!", { variant: Severity.Success });
    },
    onError: (error) => {
      enqueueSnackbar(`Failed to upload competition: ${error.message}. Error code: ${error.code}`, { variant: Severity.Error, action: SnackbarDismissButton });
    }
  })
}

export function useResetCompetitionMutation() {
  const queryClient = useQueryClient();
  const {enqueueSnackbar} = useSnackbar()

  const resetCompetition = async (resetCompetitionRequest: CompetitionServiceResetScoresRequest) => {
    return await gRPCClients.competition.v2.competitionServicePromiseClient.resetScores(resetCompetitionRequest)
  }

  return useMutation<CompetitionServiceResetScoresResponse, grpcWeb.RpcError, CompetitionServiceResetScoresRequest>(resetCompetition, {
    onSuccess: () => {
      enqueueSnackbar("Successfully reset all of the scores!", { variant: Severity.Success, });
      return queryClient.invalidateQueries(["report"])
    },
    onError: (error) => {
      enqueueSnackbar(`Failed to reset scores: ${error.message}. Error code: ${error.code}`, { variant: Severity.Error, action: SnackbarDismissButton });
    }
  })
}

export function useDeleteCompetitionMutation() {
  const queryClient = useQueryClient();
  const {enqueueSnackbar} = useSnackbar()

  const deleteCompetition = async (deleteCompetitionRequest: CompetitionServiceDeleteCompetitionRequest) => {
    return await gRPCClients.competition.v2.competitionServicePromiseClient.deleteCompetition(deleteCompetitionRequest)
  }

  return useMutation<CompetitionServiceDeleteCompetitionResponse, grpcWeb.RpcError, CompetitionServiceDeleteCompetitionRequest>(deleteCompetition, {
    onSuccess: () => {
      enqueueSnackbar("Successfully deleted all competition data!", { variant: Severity.Success, });
    },
    onError: (error) => {
      enqueueSnackbar(`Failed to delete competition data: ${error.message}. Error code: ${error.code}`, { variant: Severity.Error, action: SnackbarDismissButton });
    }
  })
}