import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { PaletteTypeProvider } from "~/contexts/PaletteTypeContext";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <PaletteTypeProvider>
        <App />
      </PaletteTypeProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
