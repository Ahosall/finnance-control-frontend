import { AppBar, IconButton, Toolbar } from "@mui/material";

import { LogoutOutlined as LogoutIcon } from "@mui/icons-material";

import { useAuth } from "../hooks/auth.hook";

const Header = () => {
  const { logout } = useAuth();

  return (
    <AppBar
      position="fixed"
      color="inherit"
      sx={{
        width: `calc(100% - 270px)`,
        ml: `270px`,
      }}
    >
      <Toolbar sx={{ justifyContent: "end" }}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          color="inherit"
          onClick={() => logout()}
        >
          <LogoutIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
