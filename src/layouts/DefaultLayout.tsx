import { Outlet } from "react-router-dom";
import { Box, Container } from "@material-ui/core";
import { MainNav } from "../components/MainNav";

export default function DefaultLayout() {
  return (
    <>
      <MainNav />
      <Box m={2} display={"flex"}>
        <Container maxWidth={"xl"}>
          <Outlet />
        </Container>
      </Box>
    </>
  );
}
