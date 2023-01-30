import { useQuery, useQueryClient } from "@tanstack/react-query";
import { SimpleReport } from "~/types/types";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { useGrpcWebCallbackClient, useGrpcWebPromiseClient } from "~/lib/grpc/transport";
import { ConnectError } from "@bufbuild/connect-web";
import { ReportService } from "@buf/scoretrak_scoretrakapis.bufbuild_connect-web/scoretrak/report/v2/report_connectweb";
import { ReportServiceGetResponse } from "@buf/scoretrak_scoretrakapis.bufbuild_es/scoretrak/report/v2/report_pb";
import { useEffect } from "react";

export function useReportQuery() {
  const queryClient = useQueryClient()
  const reportClient = useGrpcWebPromiseClient(ReportService)

  const fetchReport = async () => {
    const res = await reportClient.getUnary({})
    const cache = res.report?.cache
    return JSON.parse(<string>cache) as SimpleReport
  };

  return useQuery<SimpleReport, ConnectError, SimpleReport, ["report"]>(["report"], fetchReport, {
    onSuccess: data => {
      return queryClient.invalidateQueries(["checks"])
    },
    // We want to update the report data with the websocket connection defined below
    staleTime: Infinity,
    retry: false,
  });
}

export function useReportSubscription() {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const reportClient = useGrpcWebCallbackClient(ReportService)

  useEffect(() => {
    const cancel = reportClient.get({}, (res: ReportServiceGetResponse) => {
      const cache = res.report?.cache
      queryClient.setQueryData(["report"], JSON.parse(<string>cache) as SimpleReport)
    }, (err?: ConnectError) => {
      console.error(err);
    });

    return () => cancel()
  }, [reportClient])
}
