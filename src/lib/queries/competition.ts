import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { gRPCClients } from "../../grpc/gRPCClients";
import {
  Competition,
  DeleteCompetitionRequest,
  DeleteCompetitionResponse,
  FetchCoreCompetitionRequest,
  FetchCoreCompetitionResponse,
  FetchEntireCompetitionRequest,
  FetchEntireCompetitionResponse, LoadCompetitionRequest, LoadCompetitionResponse,
  ResetScoresRequest,
  ResetScoresResponse
} from "@buf/scoretrak_scoretrakapis.grpc_web/scoretrak/competition/v1/competition_pb";
import grpcWeb from "grpc-web";
import { Severity } from "../../types/types";
import { useSnackbar } from "notistack";
import { SnackbarDismissButton } from "../../components/SnackbarDismissButton";


export function useCoreCompetitionQuery() {
  const fetchCoreCompetition = async () => {
    return await gRPCClients.competition.v1.competitionServicePromiseClient.fetchCoreCompetition(new FetchCoreCompetitionRequest(), {})
  }

  return useQuery<FetchCoreCompetitionResponse, grpcWeb.RpcError, FetchCoreCompetitionResponse>(["competition", "core"], fetchCoreCompetition)
}

export function useEntireCompetitionQuery() {
  const fetchEntireCompetition = async () => {
    return await gRPCClients.competition.v1.competitionServicePromiseClient.fetchEntireCompetition(new FetchEntireCompetitionRequest(), {})
  }

  return useQuery<FetchEntireCompetitionResponse, grpcWeb.RpcError, FetchEntireCompetitionResponse>(["competition", "entire"], fetchEntireCompetition)
}

export function useLoadCompetitionMutation() {
  const queryClient = useQueryClient();
  const {enqueueSnackbar} = useSnackbar()

  const loadCompetition = async (competition: Competition) => {
    return await gRPCClients.competition.v1.competitionServicePromiseClient.loadCompetition(new LoadCompetitionRequest().setCompetition(), {})
  }

  return useMutation<LoadCompetitionResponse, grpcWeb.RpcError, Competition>(loadCompetition, {
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

  const resetCompetition = async (resetCompetitionRequest: ResetScoresRequest) => {
    return await gRPCClients.competition.v1.competitionServicePromiseClient.resetScores(new ResetScoresRequest(), {})
  }

  return useMutation<ResetScoresResponse, grpcWeb.RpcError, ResetScoresRequest>(gRPCClients.competition.v1.competitionServicePromiseClient.resetScores, {
    onSuccess: () => {
      enqueueSnackbar("Successfully reset all of the scores!", { variant: Severity.Success, });
    },
    onError: (error) => {
      enqueueSnackbar(`Failed to reset scores: ${error.message}. Error code: ${error.code}`, { variant: Severity.Error, action: SnackbarDismissButton });
    }
  })
}

export function useDeleteCompetitionMutation() {
  const queryClient = useQueryClient();
  const {enqueueSnackbar} = useSnackbar()

  const deleteCompetition = async (deleteCompetitionRequest: DeleteCompetitionRequest) => {
    return await gRPCClients.competition.v1.competitionServicePromiseClient.deleteCompetition(new DeleteCompetitionRequest(), {})
  }

  return useMutation<DeleteCompetitionResponse, grpcWeb.RpcError, DeleteCompetitionRequest>(deleteCompetition, {
    onSuccess: () => {
      enqueueSnackbar("Successfully deleted all competition data!", { variant: Severity.Success, });
    },
    onError: (error) => {
      enqueueSnackbar(`Failed to delete competition data: ${error.message}. Error code: ${error.code}`, { variant: Severity.Error, action: SnackbarDismissButton });
    }
  })
}