import TeamMenu from "../../components/SettingMenus/TeamMenu";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

export default function Teams() {
  return (
    <>
      <Box m={2}>
        <Typography color="textPrimary" variant={"h3"}>
          Teams
        </Typography>
      </Box>
      <TeamMenu />
    </>
  );
}
