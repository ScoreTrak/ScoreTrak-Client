
import './App.css';
import {useMemo} from 'react';
import './App.css';
import {ThemeProvider} from "@material-ui/core/styles";
import {deepOrange, deepPurple, lightBlue, orange} from "@material-ui/core/colors";
import CssBaseline from "@material-ui/core/CssBaseline";
import {SnackbarProvider} from "notistack";
import {PolicyProvider} from "./contexts/PolicyContext";
import {createTheme} from "@material-ui/core";
import {useTitle} from "react-use";
import {usePaletteType} from "./contexts/PaletteTypeContext";
import {Route, Routes} from "react-router-dom";
import {TitleContextProvider} from "./contexts/BannerTitleContext";
import DefaultLayout from "./layouts/DefaultLayout";
import AuthLayout from "./layouts/AuthLayout";
import SignIn from "./routes/auth/sign_in";
import Settings from "./routes/settings";
import Logs from "./routes/logs";
import {ReportProvider} from "./contexts/ReportContext";
import Ranks from "./routes/scoreboard/ranks";
import Details from "./routes/scoreboard/details";
import Hosts from "./routes/settings/hosts";
import Users from "./routes/settings/users";
import Teams from "./routes/settings/teams";
import Services from "./routes/settings/services";
import ServiceGroups from "./routes/settings/service_groups";
import Properties from "./routes/settings/properties";
import HostGroups from "./routes/settings/host_groups";
import Scoreboard from "./routes/scoreboard";
import ScoreboardLayout from "./layouts/ScoreboardLayout";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient()

function App() {
  useTitle("ScoreTrak")
  const {paletteType} = usePaletteType()

  const theme = useMemo(
      () =>
          createTheme({
            palette: {
              type: paletteType,
              primary: {
                main: paletteType === "light" ? lightBlue[500] : orange[500]
              },
              secondary: {
                main: paletteType === "light" ? deepPurple[500] : deepOrange[500]
              }
            },
          }),
      [paletteType],
  );

  return (
      <ThemeProvider theme={theme}>
          <CssBaseline />
          <QueryClientProvider client={queryClient}>
              <SnackbarProvider maxSnack={3} anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
              }} dense preventDuplicate>
                  <PolicyProvider>
                      <ReportProvider>
                          <TitleContextProvider>
                              <Routes>
                                  <Route path={"/"} element={<ScoreboardLayout />}>
                                      <Route index element={<Scoreboard />} />
                                  </Route>
                                  <Route path={"/"} element={<DefaultLayout />}>
                                      <Route path={"logs"} element={<Logs />} />
                                  </Route>
                                  <Route path={"scoreboard"} element={<ScoreboardLayout />}>
                                      <Route index element={<Scoreboard />} />
                                      <Route path={"ranks"} element={<Ranks />} />
                                      <Route path={"details"} element={<Details />} />
                                  </Route>
                                  <Route path={"auth"} element={<AuthLayout />}>
                                      <Route path={"sign_in"} element={<SignIn />} />
                                  </Route>
                                  <Route path={"settings"} element={<DefaultLayout />}>
                                      <Route index element={<Settings />} />
                                      <Route path={"hosts"} element={<Hosts />} />
                                      <Route path={"host_groups"} element={<HostGroups />} />
                                      <Route path={"properties"} element={<Properties />} />
                                      <Route path={"service_groups"} element={<ServiceGroups />} />
                                      <Route path={"services"} element={<Services />} />
                                      <Route path={"teams"} element={<Teams />} />
                                      <Route path={"users"} element={<Users />} />
                                  </Route>
                              </Routes>
                          </TitleContextProvider>
                      </ReportProvider>
                  </PolicyProvider>
              </SnackbarProvider>
          </QueryClientProvider>
      </ThemeProvider>
  );
}

export default App;
