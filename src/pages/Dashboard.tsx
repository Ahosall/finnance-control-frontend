import { useEffect, useState } from "react";
import { Box, Card, Grid2 as Grid } from "@mui/material";

import Category from "../components/Category";
import { listCategoriesForDashboard } from "../services/api";

const Dashboard = () => {
  const [categories, setCategories] = useState<
    { name: string; total: number }[]
  >([]);

  useEffect(() => {
    (async () => {
      const apiCategories = await listCategoriesForDashboard();
      setCategories(apiCategories);
    })();
  }, []);

  return (
    <Box>
      <Grid
        container
        direction="row"
        spacing={2}
        sx={{
          justifyContent: "start",
          alignItems: "center",
        }}
      >
        {categories.map((category, idx) => (
          <Grid key={idx} size={{ xs: 12, lg: 6, xl: 3 }}>
            <Category name={category.name} total={category.total} />
          </Grid>
        ))}
      </Grid>

      <Card sx={{ my: 2, height: "60vh" }}></Card>
      <Card sx={{ height: "45vh" }}></Card>
      <Card sx={{ mt: 2, height: "30vh" }}></Card>
    </Box>
  );
};

export default Dashboard;
