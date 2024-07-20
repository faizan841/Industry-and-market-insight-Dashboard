import { CssBaseline, ThemeProvider } from "@mui/material";
import { Suspense, lazy } from "react";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { themeSettings } from "./theme";

const Dashboard = lazy(() => import("./scenes/dashboard/index"));
const Likelihood = lazy(() => import("./scenes/Likelihood/Likelihood"));
const Country = lazy(() => import("./scenes/country/Country"));
const Topics = lazy(() => import("./scenes/topics/Topics"));
const Year = lazy(() => import("./scenes/year/Year"));
const Layout = lazy(() => import("./scenes/layout/index"));

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
              <Route
                path="/dashboard"
                element={
                  <Suspense fallback={<div>Loading...</div>}>
                    <Dashboard />
                  </Suspense>
                }
              />
              <Route
                path="/likelihood"
                element={
                  <Suspense fallback={<div>Loading...</div>}>
                    <Likelihood />
                  </Suspense>
                }
              />
              <Route
                path="/country"
                element={
                  <Suspense fallback={<div>Loading...</div>}>
                    <Country />
                  </Suspense>
                }
              />
              <Route
                path="/topics"
                element={
                  <Suspense fallback={<div>Loading...</div>}>
                    <Topics />
                  </Suspense>
                }
              />
              <Route
                path="/year"
                element={
                  <Suspense fallback={<div>Loading...</div>}>
                    <Year />
                  </Suspense>
                }
              />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
