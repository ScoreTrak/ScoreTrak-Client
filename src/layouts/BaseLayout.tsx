import { MainNav } from "../components/MainNav";
import React from "react";
import { Box, Container } from "@material-ui/core";

// @ts-ignore
export default function BaseLayout({ children }) {
  return (
    <>
      <MainNav />
      <Box m={2} display={"flex"}>
        <Container maxWidth={"xl"}>{children}</Container>
      </Box>
    </>
  );
}
