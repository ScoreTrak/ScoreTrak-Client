import PropertiesMenu from "../../components/SettingMenus/PropertiesMenu";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

export default function Properties() {
  return (
    <>
      <Box m={2}>
        <Typography color="textPrimary" variant={"h3"}>
          Properties
        </Typography>
      </Box>
      <PropertiesMenu />
    </>
  );
}
