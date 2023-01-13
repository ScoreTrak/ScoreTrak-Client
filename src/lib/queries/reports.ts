import { gRPCClients } from "../../grpc/gRPCClients";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import grpcWeb from "grpc-web";
import { Severity, SimpleReport } from "../../types/types";
import { SnackbarDismissButton } from "../../components/SnackbarDismissButton";
import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { token } from "~/grpc/token/token";
import { useNavigate } from "react-router-dom";
import {
  GetRequest,
  GetResponse,
  GetUnaryRequest,
} from "@buf/grpc_web_scoretrak_scoretrakapis/scoretrak/report/v1/report_pb";
import { QueryKey } from "@tanstack/react-query-devtools/build/lib/styledComponents";

export function useReportQuery() {
  const queryClient = useQueryClient()
  const fetchReport = async () => {
    const reportResponse =
      await gRPCClients.report.v1.reportServicePromiseClient.getUnary(
        new GetUnaryRequest(),
        {}
      );

    const cache = reportResponse.getReport()?.getCache();

    return JSON.parse(<string>cache) as SimpleReport;
  };

  return useQuery<SimpleReport, grpcWeb.RpcError, SimpleReport, ["report"]>(["report"], fetchReport, {
    onSuccess: data => {
      return queryClient.invalidateQueries(["checks"])
    }
  });
}

export function useReportSubscription() {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  useEffect(() => {
    const streamRequest = new GetRequest();
    const stream = gRPCClients.report.v1.reportServicePromiseClient.get(
      streamRequest,
      {}
    );

    // @ts-ignore
    stream.on("data", (response: GetResponse) => {
      const cache = (response as GetResponse).getReport()?.getCache();
      if (cache != null) {
        const report = JSON.parse(cache) as SimpleReport;
        queryClient.setQueryData(["report"], report);
      }
    });

    stream.on("error", (err: grpcWeb.RpcError) => {
      if (err.code === 7 || err.code === 16) {
        // May want to export this logic outside the grpc streaming/web socket.
        token.logout();
        navigate("/auth/sign_in");
      } else if (err.code === 14) {
        enqueueSnackbar(`Lost connection to Server`, {
          variant: Severity.Warning,
          action: SnackbarDismissButton,
        });
      } else {
        enqueueSnackbar(
          `Encountered an error while fetching report: ${err.message}. Error code: ${err.code}`,
          { variant: Severity.Error, action: SnackbarDismissButton }
        );
      }
    });

    return () => stream.cancel();
  }, [queryClient]);
}
