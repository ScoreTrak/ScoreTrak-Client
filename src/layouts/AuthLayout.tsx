import { MainNav } from "../components/MainNav";
import { Outlet } from "react-router-dom";
import { Box, Container } from "@material-ui/core";
import BaseLayout from "~/layouts/BaseLayout";

export default function AuthLayout() {
  return (
    <BaseLayout>
      <MainNav />
      <Box m={2} display={"flex"}>
        <Container maxWidth={"sm"}>
          <Outlet />
        </Container>
      </Box>
    </BaseLayout>
  );
}
