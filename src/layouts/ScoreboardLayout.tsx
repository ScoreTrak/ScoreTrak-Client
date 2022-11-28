import { Outlet } from "react-router-dom";
import React from "react";
import { Box, Container } from "@material-ui/core";
import PreCompBanner from "../components/PreCompBanner";
import { MainNav } from "../components/MainNav";
import { useReportQuery, useReportSubscription } from "~/lib/queries/reports";

export default function ScoreboardLayout() {
  useReportSubscription();
  const { data: reportData, isLoading: reportIsLoading } = useReportQuery();
  return (
    <>
      <MainNav />
      <Box m={3} display={"flex"}>
        <Container maxWidth={"xl"}>
          {reportData && reportData.Round !== 0 ? (
            <Outlet />
          ) : (
            <PreCompBanner />
          )}
        </Container>
      </Box>
    </>
  );
}
