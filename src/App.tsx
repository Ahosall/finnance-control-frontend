import { Box, createTheme, CssBaseline, ThemeProvider, Toolbar } from "@mui/material";
import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";

// Componentes
import Navigation from "./components/Navigation";
import Header from "./components/Header";

// Pages
import Dashboard from "./pages/Dashboard";
import NewTransaction from "./pages/transactions/New";
import ListTransactions from "./pages/transactions/List";

// Theme
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const App = () => {
  const layout = (
    <Box sx={{ display: "flex" }}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Header />
        <Navigation />

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 3,
            px: { xs: 2, md: 10, xl: 20 },
            width: `calc(100% - 270px)`,
          }}
        >
          <Toolbar />
          <Outlet />
        </Box>
      </ThemeProvider>
    </Box>
  );

  return (
    <RouterProvider
      router={createBrowserRouter([
        {
          path: "/",
          element: layout,
          children: [
            {
              path: "",
              element: <Dashboard />,
            },
            {
              path: "/transactions/new",
              element: <NewTransaction />,
            },
            {
              path: "/transactions/",
              element: <ListTransactions />,
            },
          ],
        },
      ])}
    />
  );
};

export default App;
