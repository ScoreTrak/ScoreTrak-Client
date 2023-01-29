import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import grpcWeb from "grpc-web";
import { Severity } from "~/types/types";
import { SnackbarDismissButton } from "~/components/SnackbarDismissButton";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { ConnectError} from "@bufbuild/connect-web";
import { PolicyService } from "@buf/scoretrak_scoretrakapis.bufbuild_connect-web/scoretrak/policy/v2/policy_connectweb";
import { useGrpcWebCallbackClient, useGrpcWebPromiseClient } from "~/lib/grpc/transport";
import {
  Policy,
  PolicyServiceGetResponse, PolicyServiceUpdateRequest, PolicyServiceUpdateResponse
} from "@buf/scoretrak_scoretrakapis.bufbuild_es/scoretrak/policy/v2/policy_pb";

export function usePolicyQuery() {
  const policyClient = useGrpcWebPromiseClient(PolicyService)

  return useQuery<Policy, ConnectError, Policy, ['policy']>(["policy"], async () => (await policyClient.getUnary({})).policy, {staleTime: Infinity, refetchInterval: 5000});
}

export function usePolicySubscription() {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const policyClient = useGrpcWebCallbackClient(PolicyService)
  policyClient.get({}, (res: PolicyServiceGetResponse) => {
    // queryClient.setQueryData(["policy"], res.policy)
    // the policyclient on the server can get corrupted so we invalidate the can call the get unary data
    // that calls from the database. Allowing use this websocket connection as a pubsub for policy data change. :)
    queryClient.invalidateQueries(["policy"])
  }, (err?: ConnectError) => {
    console.error(err);
  })
}

export function useUpdatePolicyMutation() {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  const policyClient = useGrpcWebPromiseClient(PolicyService)

  const updatePolicy = async (policy: Policy) => {
    console.log('update');
    console.log(policy);
    return await policyClient.update({ policy: policy });
  };

  return useMutation(updatePolicy, {
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
