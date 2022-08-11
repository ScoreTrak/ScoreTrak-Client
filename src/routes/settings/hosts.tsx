import HostMenu from "../../components/SettingMenus/HostMenu";
import {Breadcrumbs, Link, Typography} from "@material-ui/core";
import {useNavigate} from "react-router-dom";

export default function Hosts() {
    const navigate = useNavigate()
    return (
        <>
            <Breadcrumbs aria-label="breadcrumb">
                <Link color="inherit" href="/settings" onClick={() => navigate("/settings")}>
                    Settings
                </Link>
                <Typography color="textPrimary">Hosts</Typography>
            </Breadcrumbs>
            <HostMenu />
        </>
    )
}