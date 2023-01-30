import { Outlet } from "react-router-dom";
import React from "react";
import { Box, Container } from "@material-ui/core";
import PreCompBanner from "../components/PreCompBanner";
import { MainNav } from "../components/MainNav";
import { useReportQuery  } from "~/lib/queries/reports";
import BaseLayout from "~/layouts/BaseLayout";

export default function ScoreboardLayout() {
  const { data: reportData, isLoading: reportIsLoading } = useReportQuery();

  return (
    <BaseLayout>
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
    </BaseLayout>
  );
}
