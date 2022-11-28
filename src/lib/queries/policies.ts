import { gRPCClients } from "../../grpc/gRPCClients";
import {
  GetRequest,
  GetResponse,
  GetUnaryRequest,
  Policy,
  UpdateRequest,
  UpdateResponse,
} from "@buf/grpc_web_scoretrak_scoretrakapis/scoretrak/policy/v1/policy_pb";
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
      await gRPCClients.policy.v1.policyServicePromiseClient.getUnary(
        new GetUnaryRequest(),
        {}
      );

    return policyResponse.getPolicy()!.toObject();
  };

  return useQuery<Policy.AsObject, grpcWeb.RpcError>(["policy"], fetchPolicy);
}

export function usePolicySubscription() {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  useEffect(() => {
    const streamRequest = new GetRequest();
    const stream =
      gRPCClients.policy.v1.policyServicePromiseClient.get(streamRequest);

    // @ts-ignore
    stream.on("data", (response: GetResponse) => {
      if (response.hasPolicy()) {
        queryClient.setQueryData(["policy"], response.getPolicy()!.toObject());
      }
    });

    stream.on("error", (err: grpcWeb.RpcError) => {
      if (err.code === 7 || err.code === 16) {
        enqueueSnackbar(
          `You are not authorized to perform this action. Please Log in`,
          { variant: Severity.Error, action: SnackbarDismissButton }
        );
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
  }, [queryClient]);
}

export function useUpdatePolicyMutation() {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  const updatePolicy = async (policy: Policy) => {
    return await gRPCClients.policy.v1.policyServicePromiseClient.update(
      new UpdateRequest().setPolicy(policy),
      {}
    );
  };

  return useMutation<UpdateResponse, grpcWeb.RpcError, Policy>(updatePolicy, {
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
