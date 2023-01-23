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
  ReportServiceGetRequest,
  ReportServiceGetResponse,
  ReportServiceGetUnaryRequest,
} from "@buf/scoretrak_scoretrakapis.grpc_web/scoretrak/report/v2/report_pb";
import { QueryKey } from "@tanstack/react-query-devtools/build/lib/styledComponents";

export function useReportQuery() {
  const queryClient = useQueryClient()
  const fetchReport = async () => {
    const reportResponse =
      await gRPCClients.report.v2.reportServicePromiseClient.getUnary(
        new ReportServiceGetUnaryRequest(),
        {}
      );

    const cache = reportResponse.getReport()?.getCache();

    return JSON.parse(<string>cache) as SimpleReport;
  };

  return useQuery<SimpleReport, grpcWeb.RpcError, SimpleReport, ["report"]>(["report"], fetchReport, {
    onSuccess: data => {
      return queryClient.invalidateQueries(["checks"])
    },
    // We want to update the report data with the websocket connection defined below
    staleTime: Infinity
  });
}

export function useReportSubscription() {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  useEffect(() => {
    const streamRequest = new ReportServiceGetRequest();
    const stream = gRPCClients.report.v2.reportServicePromiseClient.get(
      streamRequest,
      {}
    );

    // @ts-ignore
    stream.on("data", (response: ReportServiceGetResponse) => {
      const cache = (response as ReportServiceGetResponse).getReport()?.getCache();
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
