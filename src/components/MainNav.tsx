import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import { makeStyles } from "@material-ui/core/styles";
import { Brightness4, Brightness7 } from "@material-ui/icons";
import { Button, Container, Menu, MenuItem, useTheme } from "@material-ui/core";
import { usePaletteType } from "../contexts/PaletteTypeContext";
import { useBannerTitle } from "../contexts/BannerTitleContext";
import { Role, token } from "../grpc/token/token";
import SettingsIcon from "@material-ui/icons/Settings";
import DescriptionIcon from "@material-ui/icons/Description";
import BarChartIcon from "@material-ui/icons/BarChart";
import DetailsIcon from "@material-ui/icons/Details";
import {
  Link as RouterLink,
  NavigateOptions,
  To,
  useNavigate,
} from "react-router-dom";
import { useReport } from "../contexts/ReportContext";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { usePolicy } from "../contexts/PolicyContext";
import { MouseEvent, useState } from "react";

const useStyles = makeStyles((_) => ({
  toolbar: {
    position: "relative",
    paddingRight: 24,
  },
  title: {
    flexGrow: 1,
  },
}));

export function MainNav() {
  const policy = usePolicy();
  const report = useReport();
  const theme = useTheme();
  const { togglePaletteType } = usePaletteType();
  const classes = useStyles();
  const { bannerTitle } = useBannerTitle();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigateSettings = (to: To, options?: NavigateOptions) => {
    return () => {
      handleClose();
      navigate(`/settings${to}`, options);
    };
  };

  const handleLogout = () => {
    token.logout();
    navigate("/");
  };

  return (
    <AppBar position="static">
      <Container maxWidth={"xl"}>
        <Toolbar className={classes.toolbar}>
          {/*<IconButton*/}
          {/*    edge="start"*/}
          {/*    color="inherit"*/}
          {/*    aria-label="open drawer"*/}
          {/*    onClick={handleDrawerOpen}*/}
          {/*    className={clsx(*/}
          {/*        classes.menuButton,*/}
          {/*        open && classes.menuButtonHidden*/}
          {/*    )}*/}
          {/*>*/}
          {/*    <MenuIcon />*/}
          {/*</IconButton>*/}
          <Typography
            component={RouterLink}
            to={"/"}
            variant="h6"
            color="inherit"
            className={classes.title}
          >
            {report?.Round === 0
              ? "Competition has not yet started!"
              : `Round: ${report?.Round}`}
          </Typography>
          {
            <>
              {((policy && policy.showPoints?.value) ||
                token.getCurrentRole() === Role.Black) && (
                <IconButton href={"/scoreboard"}>
                  <CheckCircleIcon />
                </IconButton>
              )}
              <IconButton href={"/scoreboard/ranks"}>
                <BarChartIcon />
              </IconButton>
              {(token.getCurrentRole() === Role.Red ||
                token.getCurrentRole() === Role.Blue ||
                token.getCurrentRole() === Role.Black) && (
                <IconButton href={"/scoreboard/details"}>
                  <DetailsIcon />
                </IconButton>
              )}
            </>
          }
          {!token.isAValidToken() ? (
            <Button href={"/auth/sign_in"} color={"inherit"}>
              Sign In
            </Button>
          ) : (
            <>
              <Button color={"inherit"} onClick={handleLogout}>
                Sign Out
              </Button>
              {token.getCurrentRole() === Role.Black && (
                <>
                  <IconButton href={"/logs"}>
                    <DescriptionIcon />
                  </IconButton>
                  <IconButton onClick={handleMenu}>
                    <SettingsIcon />
                  </IconButton>
                </>
              )}
            </>
          )}
          <IconButton onClick={togglePaletteType}>
            {theme.palette.type !== "light" ? <Brightness7 /> : <Brightness4 />}
          </IconButton>

          {token.getCurrentRole() === Role.Black && (
            <Menu
              id="settings-menu"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={navigateSettings("")}>Settings</MenuItem>
              <MenuItem onClick={navigateSettings("/hosts")}>Hosts</MenuItem>
              <MenuItem onClick={navigateSettings("/host_groups")}>
                Host Groups
              </MenuItem>
              <MenuItem onClick={navigateSettings("/services")}>
                Services
              </MenuItem>
              <MenuItem onClick={navigateSettings("/service_groups")}>
                Service Groups
              </MenuItem>
              <MenuItem onClick={navigateSettings("/properties")}>
                Properties
              </MenuItem>
              <MenuItem onClick={navigateSettings("/teams")}>Teams</MenuItem>
              <MenuItem onClick={navigateSettings("/users")}>Users</MenuItem>
            </Menu>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
