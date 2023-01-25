import { gRPCClients } from "../../grpc/gRPCClients";
import {
  PolicyServiceGetRequest,
  PolicyServiceGetResponse,
  PolicyServiceGetUnaryRequest,
  Policy,
  PolicyServiceUpdateRequest,
  PolicyServiceUpdateResponse,
} from "@buf/scoretrak_scoretrakapis.grpc_web/scoretrak/policy/v2/policy_pb";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import grpcWeb from "grpc-web";
import { Severity } from "../../types/types";
import { SnackbarDismissButton } from "../../components/SnackbarDismissButton";
import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { token } from "~/grpc/token/token";
import { useNavigate } from "react-router-dom";

export function usePolicyQuery() {
  const fetchPolicy = async () => {
    const policyResponse =
      await gRPCClients.policy.v2.policyServicePromiseClient.getUnary(
        new PolicyServiceGetUnaryRequest()
      );

    return policyResponse.getPolicy()!.toObject();
  };

  // We want to update the policy data with the websocket connection defined below
  return useQuery<Policy.AsObject, grpcWeb.RpcError>(["policy"], fetchPolicy, {refetchInterval: 1000});
}

export function usePolicySubscription() {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  useEffect(() => {
    const streamRequest = new PolicyServiceGetRequest();
    const stream =
      gRPCClients.policy.v2.policyServicePromiseClient.get(streamRequest);

    stream.on("data", (response) => {
      if (response.hasPolicy()) {
        queryClient.setQueryData(["policy"], response.getPolicy()!.toObject());
        queryClient.invalidateQueries(["checks"])
      }
    });

    stream.on("error", (err) => {
      if (err.code === 7 || err.code === 16) {
        enqueueSnackbar(
          `You are not authorized to perform this action. Please Log in`,
          { variant: Severity.Error, action: SnackbarDismissButton }
        );
        // May want to export this logic outside of the grpc streaming/web socket.
        token.logout();
        navigate("/auth/sign_in");
      } else if (err.code === 14) {
        enqueueSnackbar(`Lost connection to Server`, {
          variant: Severity.Warning,
          action: SnackbarDismissButton,
        });
      } else {
        enqueueSnackbar(
          `Encountered an error while fetching policy: ${err.message}. Error code: ${err.code}`,
          { variant: Severity.Error, action: SnackbarDismissButton }
        );
      }
    });

    return () => stream.cancel();
  }, [queryClient, enqueueSnackbar, navigate]);
}

export function useUpdatePolicyMutation() {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  const updatePolicy = async (policy: Policy) => {
    return await gRPCClients.policy.v2.policyServicePromiseClient.update(
      new PolicyServiceUpdateRequest().setPolicy(policy)
    );
  };

  return useMutation<PolicyServiceUpdateResponse, grpcWeb.RpcError, Policy>(updatePolicy, {
    onSuccess: () => {
      return queryClient.invalidateQueries(["policy"]);
    },
    onError: (error) => {
      enqueueSnackbar(
        `Failed to update policy: ${error.message}. Error code: ${error.code}`,
        { variant: Severity.Error, action: SnackbarDismissButton }
      );
    },
  });
}
