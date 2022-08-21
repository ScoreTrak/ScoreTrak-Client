import ServiceMenu from "../../components/SettingMenus/ServiceMenu";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

export default function Services() {
    return (
        <>
            <Box m={2}>
                <Typography color="textPrimary" variant={"h3"}>Services</Typography>
            </Box>
            <ServiceMenu />
        </>
    )
}