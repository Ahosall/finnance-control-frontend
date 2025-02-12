import { AppBar, Toolbar } from "@mui/material";

const Header = () => {
  return (
    <AppBar
      position="fixed"
      color="inherit"
      sx={{
        width: `calc(100% - 270px)`,
        ml: `270px`,
      }}
    >
      <Toolbar />
    </AppBar>
  );
};

export default Header;
