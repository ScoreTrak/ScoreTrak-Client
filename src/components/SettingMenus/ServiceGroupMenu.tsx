import { Box } from "@material-ui/core";
import ServiceGroupMaterialTable from "../MaterialTables/ServiceGroupMenuTable";

export default function ServiceGroupMenu() {
  return (
    <>
      <Box height={"100%"} width={"100%"}>
        <ServiceGroupMaterialTable />
      </Box>
    </>
  );
}
