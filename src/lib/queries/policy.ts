import { gRPCClients } from "../../grpc/gRPCClients";
import {
  Policy,
  UpdateRequest,
  UpdateResponse
} from "@buf/grpc_web_scoretrak_scoretrakapis/scoretrak/policy/v1/policy_pb";
import { useMutation } from "@tanstack/react-query";
import grpcWeb from "grpc-web";
import { Severity } from "../../types/types";
import { SnackbarDismissButton } from "../../components/SnackbarDismissButton";
import { useSnackbar } from "notistack";


export function useUpdatePolicyMutation() {
  const {enqueueSnackbar} = useSnackbar()

  const updatePolicy = async (policy: Policy) => {
    return await gRPCClients.policy.v1.policyServicePromiseClient.update(new UpdateRequest().setPolicy(policy), {})
  }

  return useMutation<UpdateResponse, grpcWeb.RpcError, Policy>(updatePolicy, {
    onError: (error) => {
      enqueueSnackbar(`Failed to update policy: ${error.message}. Error code: ${error.code}`, { variant: Severity.Error, action: SnackbarDismissButton });
    }
  })
}