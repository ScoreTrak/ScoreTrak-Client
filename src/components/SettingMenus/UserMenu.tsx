import { Box } from "@material-ui/core";
import UserMaterialTable from "../MaterialTables/UserMaterialTable";

export default function UserMenu() {
  return (
    <>
      <Box height={"100%"} width={"100%"}>
        <UserMaterialTable />
      </Box>
    </>
  );
}
