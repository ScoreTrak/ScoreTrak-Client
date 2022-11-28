import { createContext, useContext, useEffect, useState } from "react";
import {
  GetRequest,
  GetResponse,
  Policy,
} from "@buf/grpc_web_scoretrak_scoretrakapis/scoretrak/policy/v1/policy_pb";
import { gRPCClients } from "../grpc/gRPCClients";
import grpcWeb from "grpc-web";
import { useSnackbar } from "notistack";
import { Severity } from "../types/types";
import { token } from "../grpc/token/token";
import { useNavigate } from "react-router-dom";
import { SnackbarDismissButton } from "../components/SnackbarDismissButton";

const PolicyContext = createContext<Policy.AsObject | undefined>(undefined);

export function usePolicy() {
  return useContext(PolicyContext);
}

// @ts-ignore
export function PolicyProvider({ children }) {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [policy, setPolicy] = useState<Policy.AsObject>();

  useEffect(() => {
    const streamRequest = new GetRequest();
    const stream = gRPCClients.policy.v1.policyServicePromiseClient.get(
      streamRequest,
      {}
    );

    // @ts-ignore
    stream.on("data", (response: GetResponse) => {
      if (response.hasPolicy()) {
        setPolicy(response.getPolicy()!.toObject());
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
      } else {
        enqueueSnackbar(
          `Encountered an error while fetching policy: ${err.message}. Error code: ${err.code}`,
          { variant: Severity.Error, action: SnackbarDismissButton }
        );
      }
    });

    return () => stream.cancel();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <PolicyContext.Provider value={policy}>{children}</PolicyContext.Provider>
  );
}
