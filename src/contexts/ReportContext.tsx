import { createContext, useContext, useEffect, useState } from "react";
import { Report } from "../types/report";
import { useSnackbar } from "notistack";
import {
  ReportServiceGetRequest,
  ReportServiceGetResponse,
} from "@buf/scoretrak_scoretrakapis.grpc_web/scoretrak/report/v2/report_pb";

import { gRPCClients } from "../grpc/gRPCClients";
import { useNavigate } from "react-router-dom";
import { token } from "../grpc/token/token";
import { Severity } from "../types/types";
import { SnackbarDismissButton } from "../components/SnackbarDismissButton";
import { useQueryClient } from "@tanstack/react-query";

export const ReportContext = createContext<Report | undefined>(undefined);

export function useReport() {
  return useContext(ReportContext);
}

// @ts-ignore
export function ReportProvider({ children }) {
  const queryClient = useQueryClient()
  const { enqueueSnackbar } = useSnackbar();
  const [report, setReport] = useState<Report | undefined>(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Creating CR")
    const streamRequest = new ReportServiceGetRequest();
    const stream = gRPCClients.report.v2.reportServicePromiseClient.get(streamRequest);

    stream.on("data", (response) => {
      console.log("data: cr");
      console.log(response.toObject());
      const cache = (response as ReportServiceGetResponse).getReport()?.getCache();
      if (cache != null) {
        const report = JSON.parse(cache) as Report;
        setReport(report);
        queryClient.setQueryData(['report'], cache)
        queryClient.invalidateQueries(['checks'])
      }
    });

    stream.on("error", (err) => {
      if (err.code === 7 || err.code === 16) {
        token.logout();
        navigate("/auth/sign_in");
      } else {
        enqueueSnackbar(
          `Encountered an error while fetching report: ${err.message}. Error code: ${err.code}`,
          { variant: Severity.Error, action: SnackbarDismissButton }
        );
      }
    });

    return () => stream.cancel();
  }, [queryClient]); // eslint-disable-line react-hooks/exhaustive-deps


  return (
    <>
      <ReportContext.Provider value={report}>{children}</ReportContext.Provider>
    </>
  );
}
