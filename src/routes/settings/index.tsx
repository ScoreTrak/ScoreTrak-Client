import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import CompMenu from "../../components/SettingMenus/CompMenu";
import { AppBar, Tab, Tabs, Theme } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TeamMenu from "../../components/SettingMenus/TeamMenu";
import UserMenu from "../../components/SettingMenus/UserMenu";
import HostGroupMenu from "../../components/SettingMenus/HostGroupMenu";
import HostMenu from "../../components/SettingMenus/HostMenu";
import ServiceGroupMenu from "../../components/SettingMenus/ServiceGroupMenu";
import ServiceMenu from "../../components/SettingMenus/ServiceMenu";
import PropertiesMenu from "../../components/SettingMenus/PropertiesMenu";
import { useTitle } from "react-use";

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
  },
}));

export default function Settings() {
  useTitle("Settings")
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };


  return (
    <Box marginTop={3} textAlign="left" className={classes.root}>
      <Box m={2}>
        <Typography color="textPrimary" variant={"h3"}>
          Settings
        </Typography>
      </Box>

      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
          centered
        >
          <Tab label="Competition" {...a11yProps(0)} />
          <Tab label="Teams" {...a11yProps(1)} />
          <Tab label="Users" {...a11yProps(2)} />
          <Tab label="Host Groups" {...a11yProps(3)} />
          <Tab label="Hosts" {...a11yProps(4)} />
          <Tab label="Service Groups" {...a11yProps(5)} />
          <Tab label="Services" {...a11yProps(6)} />
          <Tab label="Properties" {...a11yProps(7)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <CompMenu />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TeamMenu />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <UserMenu />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <HostGroupMenu />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <HostMenu />
      </TabPanel>
      <TabPanel value={value} index={5}>
        <ServiceGroupMenu />
      </TabPanel>
      <TabPanel value={value} index={6}>
        <ServiceMenu />
      </TabPanel>
      <TabPanel value={value} index={7}>
        <PropertiesMenu />
      </TabPanel>

    </Box>
  );
}
