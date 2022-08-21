import HostGroupMenu from "../../components/SettingMenus/HostGroupMenu";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";


export default function HostGroups() {
    return (
        <>
            <Box m={2}>
                <Typography color="textPrimary" variant={"h3"}>Host Groups</Typography>
            </Box>
            <HostGroupMenu />
        </>
    )
}