import { gRPCClients } from "../grpc/gRPCClients";
import {
  DynamicConfig,
  DynamicConfigServiceGetRequest,
  StaticConfigServiceGetRequest,
  DynamicConfigServiceUpdateRequest,
  DynamicConfigServiceUpdateResponse,
} from "@buf/scoretrak_scoretrakapis.grpc_web/scoretrak/config/v2/config_pb";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import grpcWeb from "grpc-web";
import { Severity } from "../../types/types";
import { SnackbarDismissButton } from "../../components/SnackbarDismissButton";
import { useSnackbar } from "notistack";

export function useDynamicConfigQuery() {
  const fetchDynamicConfig = async () => {
    const dynamicConfigResponse =
      await gRPCClients.config.v2.dynamicConfigServicePromiseClient.get(
        new DynamicConfigServiceGetRequest()
      );
    return dynamicConfigResponse.getDynamicConfig();
  };

  return useQuery<DynamicConfig | undefined, grpcWeb.RpcError, DynamicConfig | undefined, ["config", "dynamic"]>(
    ["config", "dynamic"],
    fetchDynamicConfig
  );
}

export function useStaticConfigQuery() {
  const fetchStaticConfig = async () => {
    const staticConfigResponse =
      await gRPCClients.config.v2.staticConfigServicePromiseClient.get(
        new StaticConfigServiceGetRequest()
      );
    return staticConfigResponse.getStaticConfig();
  };

  return useQuery<string, grpcWeb.RpcError, string, ["config", "static"]>(
    ["config", "static"],
    fetchStaticConfig
  );
}

export function useDynamicConfigMutation() {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  const updateDynamicConfig = async (dynamicConfig: DynamicConfig) => {
    return await gRPCClients.config.v2.dynamicConfigServicePromiseClient.update(
      new DynamicConfigServiceUpdateRequest().setDynamicConfig(dynamicConfig)
    );
  };

  return useMutation<DynamicConfigServiceUpdateResponse, grpcWeb.RpcError, DynamicConfig>(
    updateDynamicConfig,
    {
      onSuccess: () => {
        return queryClient.invalidateQueries(["config", "dynamic"]);
      },
      onError: (error) => {
        enqueueSnackbar(
          `Failed to enable competition: ${error.message}. Error code: ${error.code}`,
          { variant: Severity.Error, action: SnackbarDismissButton }
        );
      },
    }
  );
}
