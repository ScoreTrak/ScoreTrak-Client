import {MainNav} from "../components/MainNav";
import {Outlet} from "react-router-dom";
import {Box, Container} from "@material-ui/core";


export default function DefaultLayout() {
    return (
        <>
            <MainNav />
            <Box m={2} height={"85vh"}>
                <Container maxWidth={"xl"}>
                    <Outlet />
                </Container>
            </Box>
        </>
    )
}