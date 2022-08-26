import UserMenu from "../../components/SettingMenus/UserMenu";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

export default function Users() {
  return (
    <>
      <Box m={2}>
        <Typography color="textPrimary" variant={"h3"}>
          Users
        </Typography>
      </Box>
      <UserMenu />
    </>
  );
}
