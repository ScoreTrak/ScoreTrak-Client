import { createContext, useContext, useEffect, useState } from "react";
import {
  PolicyServiceGetRequest,
  PolicyServiceGetResponse,
  Policy,
} from "@buf/scoretrak_scoretrakapis.grpc_web/scoretrak/policy/v2/policy_pb";
import { gRPCClients } from "../grpc/gRPCClients";
import grpcWeb from "grpc-web";
import { useSnackbar } from "notistack";
import { Severity } from "../types/types";
import { token } from "../grpc/token/token";
import { useNavigate } from "react-router-dom";
import { SnackbarDismissButton } from "../components/SnackbarDismissButton";
import { useQueryClient } from "@tanstack/react-query";

const PolicyContext = createContext<Policy.AsObject | undefined>(undefined);

export function usePolicy() {
  return useContext(PolicyContext);
}

// @ts-ignore
export function PolicyProvider({ children }) {
  const queryClient = useQueryClient()
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [policy, setPolicy] = useState<Policy.AsObject>();

  useEffect(() => {
    console.log("Creating CP");
    const streamRequest = new PolicyServiceGetRequest();
    const stream = gRPCClients.policy.v2.policyServicePromiseClient.get(streamRequest);

    // @ts-ignore
    stream.on("data", (response) => {
      console.log("data: cp");
      if (response.hasPolicy()) {
        const policyObj = response.getPolicy()!.toObject()
        setPolicy(policyObj)
        queryClient.setQueryData(["policy"], policyObj)
        queryClient.invalidateQueries(["checks"])
      }
    });

    stream.on("error", (err) => {
      if (err.code === 7 || err.code === 16) {
        enqueueSnackbar(
          `You are not authorized to perform this action. Please Log in`,
          { variant: Severity.Error, action: SnackbarDismissButton }
        );
        token.logout();
        navigate("/auth/login");
      } else {
        enqueueSnackbar(
          `Encountered an error while fetching policy: ${err.message}. Error code: ${err.code}`,
          { variant: Severity.Error, action: SnackbarDismissButton }
        );
      }
    });

    return () => stream.cancel();
  }, [queryClient]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <PolicyContext.Provider value={policy}>{children}</PolicyContext.Provider>
  );
}
