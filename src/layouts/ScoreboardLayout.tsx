import { Outlet } from "react-router-dom";
import { useReport } from "../contexts/ReportContext";
import React from "react";
import { Box, CircularProgress, Typography } from "@material-ui/core";
import BaseLayout from "./BaseLayout";
import PreCompBanner from "../components/PreCompBanner";

export default function ScoreboardLayout() {
  const report = useReport();
  return (
    <>
      <BaseLayout>
        {report && report.Round !== 0 ?
          <Outlet />
          :
          <>
            <Box mt={2} sx={{textAlign: "center"}}>
              <CircularProgress />
              {report?.Round === 0 &&
                <PreCompBanner />
              }
            </Box>
          </>
        }
      </BaseLayout>
    </>
  );
}
