import { Box, Card, Grid2 as Grid } from "@mui/material";

import { useCategoriesForDashboard } from "../hooks/categories.hook";

import CategoryCard from "../components/CategoryCard";

const Dashboard = () => {
  const { categoriesForDashboard } = useCategoriesForDashboard();

  return (
    <Box>
      <Grid
        container
        direction="row"
        spacing={2}
        sx={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {categoriesForDashboard.map((category, idx) => (
          <Grid key={idx} size={{ xs: 12, md: 6, xl: "grow" }}>
            <CategoryCard
              name={category.name}
              total={category.total}
              type={category.type}
            />
          </Grid>
        ))}
      </Grid>

      <Card sx={{ height: "45vh" }}></Card>
    </Box>
  );
};

export default Dashboard;
