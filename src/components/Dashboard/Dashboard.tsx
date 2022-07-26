import React, {useState} from "react";
import clsx from "clsx";
import {makeStyles} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Switch from "@material-ui/core/Switch";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import {adminListItems} from "./listItems";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import {Link, Route, Switch as RouterSwitch} from "react-router-dom";
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {FullScreen, useFullScreenHandle} from 'react-full-screen';
import BarChartIcon from "@material-ui/icons/BarChart";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import DetailsIcon from "@material-ui/icons/Details";
import Button from "@material-ui/core/Button";
import {Severity} from "../../types/types";
import {Role, token} from "../../grpc/token/token";
import {GRPCClients} from "../../grpc/gRPCClients";
import Login from "../Login/Login";
import ScoreBoard from "../ScoreBoard/ScoreBoard";
import grey from "@material-ui/core/colors/grey";
import {useSnackbar} from 'notistack';
import Setup from "../Setup/Setup";
import Settings from "../Settings/Settings";
import {usePolicy} from "../../contexts/PolicyContext";
import {useTheme} from "@material-ui/core";
import {Brightness4, Brightness7} from "@material-ui/icons";
import {usePaletteType} from "../../contexts/PaletteTypeContext";


const drawerWidth = 260;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  toolbar: {
    position: "relative",
    paddingRight: 24
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  menuButtonHidden: {
    display: "none"
  },
  title: {
    flexGrow: 1
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9)
    }
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto"
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  },
  fixedHeight: {
    height: '85vh'
  },
  fullSizeHeight: {
    height: '100vh'
  }
}));

interface DashboardProps{
  gRPCClients: GRPCClients
}

export default function Dashboard(props: DashboardProps) {
  const policy = usePolicy()
  const [open, setOpen] = useState<boolean>(false);
  const [Title, setTitle] = useState<string>("ScoreBoard")
  const theme = useTheme()
  const {togglePaletteType} = usePaletteType()
  const classes = useStyles();

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const action = (key: string) => (
      <React.Fragment>
        <Button variant="outlined" onClick={() => { closeSnackbar(key) }}>
          Dismiss
        </Button>
      </React.Fragment>
  );

  const genericEnqueue = (message: string, severity: Severity, autoHideDuration: number | null | undefined = null, uniqueID?: string) => {
    enqueueSnackbar(message, {
        variant: severity,
        autoHideDuration,
        key: uniqueID,
        action,
    })
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const logout = () => {
    token.logout()
    window.location.reload()
  }
  const handleFullScreen = useFullScreenHandle()

  return (
      <div className={classes.root}>
        <CssBaseline />
        <RouterSwitch>
          <Route exact path="/login" render={() => (
              <Login authClient={props.gRPCClients.authClient}/>
          )} />
          {
            policy && <Route path="/" render={() => (
                <React.Fragment>
                  <AppBar
                      position="absolute"
                      className={clsx(classes.appBar, open && classes.appBarShift)}
                  >
                    <Toolbar className={classes.toolbar}>
                      <IconButton
                          edge="start"
                          color="inherit"
                          aria-label="open drawer"
                          onClick={handleDrawerOpen}
                          className={clsx(
                              classes.menuButton,
                              open && classes.menuButtonHidden
                          )}
                      >
                        <MenuIcon />
                      </IconButton>
                      <Typography
                          component="h1"
                          variant="h6"
                          color="inherit"
                          noWrap
                          className={classes.title}
                      >{Title}
                      </Typography>
                    </Toolbar>
                  </AppBar>
                  <Drawer
                      variant="permanent"
                      classes={{
                        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose)
                      }}
                      open={open}>
                    <div className={classes.toolbarIcon}>
                      <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                      </IconButton>
                    </div>
                    <Divider/>
                    {/* Alternative dark mode switcher. Commenting off for later use.
                    <IconButton onClick={togglePaletteType}>
                      { theme.palette.type !== "light" ?
                          <Brightness7 />
                          :
                          <Brightness4 />
                      }
                    </IconButton>
                    */}
                    <Switch checked={theme.palette.type === "dark"} onChange={togglePaletteType} />
                    <Divider />
                    <List>
                      <div>
                        { (policy.showPoints?.value || token.getCurrentRole() === Role.Black) &&
                        <ListItem button component={Link} to="/ranks">
                          <ListItemIcon>
                            <BarChartIcon/>
                          </ListItemIcon>
                          <ListItemText primary="Ranks" />
                        </ListItem>
                        }
                        <ListItem button component={Link} to="/">
                          <ListItemIcon>
                            <CheckCircleIcon />
                          </ListItemIcon>
                          <ListItemText primary="Status" />
                        </ListItem>
                        { (token.getCurrentRole() === Role.Red || token.getCurrentRole() === Role.Blue || token.getCurrentRole() === Role.Black) &&
                        <ListItem button component={Link} to="/details">
                          <ListItemIcon>
                            <DetailsIcon />
                          </ListItemIcon>
                          <ListItemText primary="Details" />
                        </ListItem>
                        }
                      </div>
                    </List>
                    {
                      token.getCurrentRole() === Role.Black  &&
                      <List>
                        <Divider/>
                        {adminListItems}
                      </List>
                    }
                    <Divider/>
                    {
                      !token.isAValidToken() ?
                          <ListItem button component={Link} to="/login">
                            <ListItemIcon>
                              <AssignmentIndIcon />
                            </ListItemIcon>
                            <ListItemText primary="Sign In" />
                          </ListItem>
                          :
                          <ListItem button onClick={logout}>
                            <ListItemIcon>
                              <ExitToAppIcon />
                            </ListItemIcon>
                            <ListItemText primary="Sign Out" />
                          </ListItem>
                    }
                  </Drawer>
                  <main className={classes.content}>
                    <div className={classes.appBarSpacer} />
                    <Container maxWidth="xl" className={classes.container}>
                          <Route exact path={["/", "/ranks", "/details"]} render={() => (
                              <FullScreen handle={handleFullScreen}>
                                <div style={(handleFullScreen.active && ((theme.palette.type == "light" && { background: grey[50]}) || { background: grey.A400})) || undefined}>
                                  <ScoreBoard {...props} genericEnqueue={genericEnqueue} setTitle={setTitle} handleFullScreen={handleFullScreen}/>
                                </div>
                              </FullScreen>
                          )} />
                          <Route exact path="/settings" render={() => (
                              <Settings genericEnqueue={genericEnqueue} setTitle={setTitle}  gRPCClients={props.gRPCClients} />
                          )} />
                          <Route path="/setup" render={() => (
                              <Setup genericEnqueue={genericEnqueue} setTitle={setTitle}  gRPCClients={props.gRPCClients}  />
                          )} />
                    </Container>
                  </main>
                </React.Fragment>
            )} />
          }
        </RouterSwitch>
      </div>

  );
}