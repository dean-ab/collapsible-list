import { render } from "react-dom";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";

import App from "./App";

const theme = createTheme({
  typography: {
    fontFamily: [
      "Roboto",
      '"Helvetica Neue"',
      '"Segoe UI"',
      "Lato",
      "-apple-system",
      "BlinkMacSystemFont",
      "Arial"
    ].join(",")
  }
});

const rootElement = document.getElementById("root");
render(
  <StyledEngineProvider>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </StyledEngineProvider>,
  rootElement
);
