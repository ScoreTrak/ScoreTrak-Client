import ServiceGroupMenu from "../../components/SettingMenus/ServiceGroupMenu";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

export default function ServiceGroups() {
  return (
    <>
      <Box m={2}>
        <Typography color="textPrimary" variant={"h3"}>
          Service Groups
        </Typography>
      </Box>
      <ServiceGroupMenu />
    </>
  );
}
