import { Box, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";

import Header from "./Header";
import Navigation from "./Navigation";

const Layout = () => {
  return (
    <Box sx={{ display: "flex" }}>
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
    </Box>
  );
};

export default Layout;
