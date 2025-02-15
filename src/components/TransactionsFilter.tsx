import { Button, Grid2 as Grid, MenuItem, TextField } from "@mui/material";

import { ICategory } from "../services/categories.service";
import { useState } from "react";

export interface IFilters {
  categoryId: string;
  start: string;
  end: string;
}

interface Props {
  categories: ICategory[];
  setFilters: React.Dispatch<React.SetStateAction<IFilters | undefined>>;
}

const TransactionsFilter = ({ categories, setFilters }: Props) => {
  const date = new Date().toISOString();

  const [categoryId, setCategoryId] = useState("dflt");
  const [start, setStart] = useState(date.slice(0, 8) + "01");
  const [end, setEnd] = useState(date.slice(0, 10));

  const handleSearch = () => {
    setFilters({ categoryId, start, end });
  };

  return (
    <Grid
      container
      spacing={2}
      sx={{ justifyContent: "center", justifyItems: "center" }}
    >
      <Grid size={{ xs: 12, lg: 4 }}>
        <TextField
          variant="outlined"
          select
          label="Categoria"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
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
      <Grid size={{ xs: 6, lg: 3 }}>
        <TextField
          variant="outlined"
          type="date"
          value={start}
          onChange={(e) => setStart(e.target.value)}
          fullWidth
        />
      </Grid>
      <Grid size={{ xs: 6, lg: 3 }}>
        <TextField
          variant="outlined"
          type="date"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
          fullWidth
        />
      </Grid>
      <Grid size={{ xs: 12, lg: 2 }}>
        <Button
          variant="contained"
          fullWidth
          onClick={handleSearch}
          sx={{ height: "100%" }}
        >
          Pesquisar
        </Button>
      </Grid>
    </Grid>
  );
};

export default TransactionsFilter;
