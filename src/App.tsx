import CssBaseline from "@material-ui/core/CssBaseline";
import { PolicyProvider } from "./contexts/PolicyContext";
import {
  PaletteTypeProvider,
  usePaletteType,
} from "./contexts/PaletteTypeContext";
import { Route, Routes } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
import AuthLayout from "./layouts/AuthLayout";
import SignIn from "./routes/auth/sign_in";
import Settings from "./routes/settings";
import Logs from "./routes/logs";
import { ReportProvider } from "./contexts/ReportContext";
import Ranks from "./routes/scoreboard/ranks";
import Details from "./routes/scoreboard/details";
import Scoreboard from "./routes/scoreboard";
import ScoreboardLayout from "./layouts/ScoreboardLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useMemo } from "react";
import { createTheme } from "@material-ui/core";
import {
  deepOrange,
  deepPurple,
  lightBlue,
  orange,
} from "@material-ui/core/colors";
import { SnackbarProvider } from "notistack";
import { ThemeProvider } from "@material-ui/core/styles";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

function App() {
  const { paletteType } = usePaletteType();

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          type: paletteType,
          primary: {
            main: paletteType === "light" ? lightBlue[500] : orange[500],
          },
          secondary: {
            main: paletteType === "light" ? deepPurple[500] : deepOrange[500],
          },
        },
      }),
    [paletteType]
  );

  // @ts-ignore
  const bruh: (e: MouseEvent<HTMLDivElement, MouseEvent>) => void = (
    // @ts-ignore
    e: MouseEvent<HTMLDivElement, MouseEvent>
  ) => {};

  return (
    <>
      <ThemeProvider theme={theme}>
        <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          dense
          preventDuplicate
        >
          <CssBaseline />
          <QueryClientProvider client={queryClient}>
            <PolicyProvider>
              <ReportProvider>
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
                  </Route>
                </Routes>
              </ReportProvider>
            </PolicyProvider>
            <ReactQueryDevtools initialIsOpen={true} />
          </QueryClientProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
