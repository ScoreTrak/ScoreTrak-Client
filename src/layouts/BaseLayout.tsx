import React, { useMemo } from "react";
import { SnackbarProvider } from "notistack";
import { createTheme } from "@material-ui/core";
import { usePaletteType } from "../contexts/PaletteTypeContext";
import { ThemeProvider } from "@material-ui/core/styles";
import {
  deepOrange,
  deepPurple,
  lightBlue,
  orange,
} from "@material-ui/core/colors";

// @ts-ignore
export default function BaseLayout({ children }) {
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
          {children}
        </SnackbarProvider>
      </ThemeProvider>
    </>
  );
}
