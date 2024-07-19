import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { themeSettings } from "./theme";
import Dashboard from "./scenes/dashboard/index";
import Layout from "./scenes/layout/index";
import Likelihood from "./scenes/Likelihood/Likelihood";
import Country from "./scenes/country/Country";
import Topics from "./scenes/topics/Topics";
import Year from "./scenes/year/Year";

const App = () => {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/likelihood" element={<Likelihood />} />
              <Route path="/country" element={<Country />} />
              <Route path="/topics" element={<Topics />} />
              <Route path="/year" element={<Year />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
