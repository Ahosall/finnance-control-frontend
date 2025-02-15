import {
  Toolbar,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
} from "@mui/material";

import {
  SpaceDashboardOutlined as DashboardIcon,
  AddCircleOutlineOutlined as AddIcon,
  FormatListBulletedOutlined as TransactionsIcon,
  CategoryOutlined as CategoryIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Navigation = () => {
  const navigate = useNavigate();

  const pages = [
    {
      icon: <DashboardIcon />,
      name: "Dashboard",
      url: "/",
    },
    {
      icon: <TransactionsIcon />,
      name: "Transações",
      url: "/transactions",
    },
    {
      icon: <CategoryIcon />,
      name: "Categorias",
      url: "/categories",
    },
  ];

  const pages2 = [
    {
      icon: <AddIcon />,
      name: "Nova Transação",
      url: "/transactions/new",
    },
    {
      icon: <AddIcon />,
      name: "Nova Categoria",
      url: "/categories/new",
    },
  ];

  const drawer = (
    <div>
      <Toolbar>
        <Typography
          variant="h5"
          component="div"
          noWrap
          sx={{ textAlign: { md: "center" }, width: "100%", fontWeight: "500" }}
        >
          FinnanceControl
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {pages.map((page) => (
          <ListItem key={page.name.replace(" ", "_")} disablePadding>
            <ListItemButton onClick={() => navigate(page.url)}>
              <ListItemIcon>{page.icon}</ListItemIcon>
              <ListItemText primary={page.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {pages2.map((page) => (
          <ListItem key={page.name.replace(" ", "_")} disablePadding>
            <ListItemButton onClick={() => navigate(page.url)}>
              <ListItemIcon>{page.icon}</ListItemIcon>
              <ListItemText primary={page.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box component="nav" sx={{ width: "270px", flexShrink: { sm: 0 } }}>
      <Drawer
        variant="permanent"
        sx={{
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: "270px",
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default Navigation;
