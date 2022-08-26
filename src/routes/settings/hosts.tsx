import HostMenu from "../../components/SettingMenus/HostMenu";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

export default function Hosts() {
  return (
    <>
      <Box m={2}>
        <Typography color="textPrimary" variant={"h3"}>
          Hosts
        </Typography>
      </Box>
      <HostMenu />
    </>
  );
}
