import { Button, Grid2 as Grid, MenuItem, TextField } from "@mui/material";

import { ICategory } from "../services/categories.service";

interface Props {
  categories: ICategory[];
}

const TransactionsFilter = ({ categories }: Props) => {
  return (
    <Grid
      container
      spacing={2}
      sx={{ justifyContent: "center", justifyItems: "center" }}
    >
      <Grid size={{ xs: 12, xl: 4 }}>
        <TextField
          variant="outlined"
          label="Pesquise descrição/valor"
          fullWidth
        />
      </Grid>
      <Grid size={{ xs: 12, lg: 3, xl: 3 }}>
        <TextField
          variant="outlined"
          select
          label="Categoria"
          defaultValue="dflt"
          fullWidth
        >
          <MenuItem key="dflt" value="dflt">
            Todas
          </MenuItem>
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid size={{ xs: 6, lg: 3, xl: 2 }}>
        <TextField
          variant="outlined"
          type="date"
          defaultValue={new Date().toISOString().slice(0, 8) + "01"}
          fullWidth
        />
      </Grid>
      <Grid size={{ xs: 6, lg: 3, xl: 2 }}>
        <TextField
          variant="outlined"
          type="date"
          defaultValue={new Date().toISOString().slice(0, 10)}
          fullWidth
        />
      </Grid>
      <Grid size={{ xs: 12, lg: 3, xl: 1 }}>
        <Button variant="contained" fullWidth sx={{ height: "100%" }}>
          Filtrar
        </Button>
      </Grid>
    </Grid>
  );
};

export default TransactionsFilter;
