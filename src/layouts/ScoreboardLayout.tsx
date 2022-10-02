import { Outlet } from "react-router-dom";
import { useReport } from "../contexts/ReportContext";
import React from "react";
import { Box, Container } from "@material-ui/core";
import PreCompBanner from "../components/PreCompBanner";
import { MainNav } from "../components/MainNav";

export default function ScoreboardLayout() {
  const report = useReport();
  return (
    <>
      <MainNav />
      <Box m={3} display={"flex"}>
        <Container maxWidth={"xl"}>
          {report && report.Round !== 0 ? <Outlet /> : <PreCompBanner />}
        </Container>
      </Box>
    </>
  );
}
