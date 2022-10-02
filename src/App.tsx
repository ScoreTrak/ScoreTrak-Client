import CssBaseline from "@material-ui/core/CssBaseline";
import { PolicyProvider } from "./contexts/PolicyContext";
import { PaletteTypeProvider } from "./contexts/PaletteTypeContext";
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
import BaseLayout from "./layouts/BaseLayout";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <PaletteTypeProvider>
          <BaseLayout>
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
          </BaseLayout>
        </PaletteTypeProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
