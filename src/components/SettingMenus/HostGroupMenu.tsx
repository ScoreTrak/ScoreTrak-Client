import {Box} from "@material-ui/core";
import HostGroupMaterialTable from "../MaterialTables/HostGroupMaterialTable";


export default function HostGroupMenu() {
    return (
        <>
            <Box height={"100%"} width={"100%"}>
                <HostGroupMaterialTable />
            </Box>
        </>
    )
}