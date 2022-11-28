import { gRPCClients } from "../../grpc/gRPCClients";
import {
  DynamicConfig,
  GetRequest,
  GetStaticConfigRequest,
  UpdateRequest,
  UpdateResponse,
} from "@buf/grpc_web_scoretrak_scoretrakapis/scoretrak/config/v1/config_pb";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import grpcWeb from "grpc-web";
import { Severity } from "../../types/types";
import { SnackbarDismissButton } from "../../components/SnackbarDismissButton";
import { useSnackbar } from "notistack";

export function useDynamicConfigQuery() {
  const fetchDynamicConfig = async () => {
    const dynamicConfigResponse =
      await gRPCClients.config.v1.dynamicConfigServicePromiseClient.get(
        new GetRequest(),
        {}
      );
    return dynamicConfigResponse.getDynamicConfig();
  };

  return useQuery<DynamicConfig | undefined, grpcWeb.RpcError>(
    ["config", "dynamic"],
    fetchDynamicConfig
  );
}

export function useStaticConfigQuery() {
  const fetchStaticConfig = async () => {
    const staticConfigResponse =
      await gRPCClients.config.v1.staticConfigServicePromiseClient.get(
        new GetStaticConfigRequest(),
        {}
      );
    return staticConfigResponse.getStaticConfig();
  };

  return useQuery<string, grpcWeb.RpcError>(
    ["config", "static"],
    fetchStaticConfig
  );
}

export function useDynamicConfigMutation() {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  const updateDynamicConfig = async (dynamicConfig: DynamicConfig) => {
    return await gRPCClients.config.v1.dynamicConfigServicePromiseClient.update(
      new UpdateRequest().setDynamicConfig(dynamicConfig),
      {}
    );
  };

  return useMutation<UpdateResponse, grpcWeb.RpcError, DynamicConfig>(
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
