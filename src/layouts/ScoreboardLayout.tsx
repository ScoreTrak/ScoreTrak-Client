import { Outlet } from "react-router-dom";
import { useReport } from "../contexts/ReportContext";
import React from "react";
import { Box, CircularProgress, Container } from "@material-ui/core";
import PreCompBanner from "../components/PreCompBanner";
import { MainNav } from "../components/MainNav";

export default function ScoreboardLayout() {
  const report = useReport();
  return (
    <>
      <MainNav />
      {report && report.Round !== 0 ?
        <Box m={2} display={"flex"}>
          <Container maxWidth={"xl"}>
            <Outlet />
          </Container>
        </Box>
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
    </>
  );
}
