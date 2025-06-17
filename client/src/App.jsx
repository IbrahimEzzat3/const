import { BrowserRouter } from "react-router-dom";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import CssBaseline from "@mui/material/CssBaseline/CssBaseline";
import { LanguageProvider } from "./shared/context/LanguageContext";
import { AuthProvider } from "./shared/context/AuthContext";
import { HelmetProvider } from "react-helmet-async";
import theme from "./theme";
import AppRoutes from "./routes";
import AppLayout from "./components/common/AppLayout";

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <LanguageProvider>
            <AuthProvider>
              <CssBaseline />
              <AppLayout>
                <AppRoutes />
              </AppLayout>
            </AuthProvider>
          </LanguageProvider>
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
