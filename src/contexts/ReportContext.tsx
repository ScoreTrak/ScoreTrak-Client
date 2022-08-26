import { createContext, useContext, useEffect, useState } from "react";
import { Report } from "../types/report";
import { useSnackbar } from "notistack";
import {
  GetRequest,
  GetResponse,
} from "../lib/scoretrakapis/scoretrak/report/v1/report_pb";
import { gRPCClients } from "../grpc/gRPCClients";
import { useNavigate } from "react-router-dom";
import { token } from "../grpc/token/token";
import { Severity } from "../types/types";
import { SnackbarDismissButton } from "../components/SnackbarDismissButton";
import { useBannerTitle } from "./BannerTitleContext";

export const ReportContext = createContext<Report | undefined>(undefined);

export function useReport() {
  return useContext(ReportContext);
}

// @ts-ignore
export function ReportProvider({ children }) {
  const { enqueueSnackbar } = useSnackbar();
  const [report, setReport] = useState<Report | undefined>(undefined);
  const navigate = useNavigate();
  const { setBannerTitle } = useBannerTitle();

  useEffect(() => {
    const streamRequest = new GetRequest();
    const stream = gRPCClients.reportClient.get(streamRequest, {});

    stream.on("data", (response) => {
      const cache = (response as GetResponse).getReport()?.getCache();
      if (cache != null) {
        const report = JSON.parse(cache) as Report;
        setReport(report);
        setBannerTitle(`Round: ${report.Round}`);
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
  }, []);

  useEffect(() => {
    if (report) {
      setBannerTitle(`Round: ${report.Round}`);
    }
  }, [report]);

  return (
    <>
      <ReportContext.Provider value={report}>{children}</ReportContext.Provider>
    </>
  );
}
