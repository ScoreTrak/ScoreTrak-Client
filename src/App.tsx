
import './App.css';
import React, {useMemo} from 'react';
import './App.css';
import {
  BrowserRouter as Router
} from 'react-router-dom';
import {ThemeProvider} from "@material-ui/core/styles";
import {deepOrange, deepPurple, lightBlue, orange} from "@material-ui/core/colors";
import CssBaseline from "@material-ui/core/CssBaseline";
import {gRPCClients} from "./grpc/gRPCClients";
import Dashboard from "./components/Dashboard/Dashboard";
import {SnackbarProvider} from "notistack";
import {PolicyProvider} from "./contexts/PolicyContext";
import {createTheme} from "@material-ui/core";
import {useTitle} from "react-use";
import {usePaletteType} from "./contexts/PaletteTypeContext";


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
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SnackbarProvider maxSnack={3} anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }} dense preventDuplicate>
          <Router>
            <PolicyProvider>
              <Dashboard gRPCClients={gRPCClients} />
            </PolicyProvider>
          </Router>
        </SnackbarProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
