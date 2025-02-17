import { useEffect, useState } from "react";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid2 as Grid,
  MenuItem,
  TextField,
} from "@mui/material";

import { useCategories } from "../hooks/categories.hook";
import { ICategory } from "../services/categories.service";

interface Props {
  category?: ICategory;
  readOnly?: boolean;
}

const categoryTypes = [
  {
    id: "INCOME",
    name: "Receitas",
  },
  {
    id: "EXPENSE",
    name: "Despesas",
  },
];

const CategoriesForm = ({ category, readOnly }: Props) => {
  const { categories } = useCategories();

  const [name, setName] = useState("");
  const [categoryType, setCategoryType] = useState("");
  const [showOnDashboard, setShowOnDashboard] = useState(false);

  useEffect(() => {
    if (!category) return;
  }, [category, categories]);

  return (
    <Box sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <TextField
            id="nem"
            label="Nome da Categoria"
            variant="outlined"
            value={name}
            disabled={readOnly}
            fullWidth
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <TextField
            select
            label="Tipo"
            variant="outlined"
            value={categoryType}
            disabled={readOnly}
            fullWidth
            onChange={(e) => {
              const categoryType = categoryTypes.find(
                (c) => c.id === e.target.value
              );
              if (categoryType && !readOnly) {
                setCategoryType(categoryType.id);
              }
            }}
          >
            {categoryTypes.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid size={{xs: 12, md: 6}} sx={{my: 'auto'}}>
          <FormControlLabel
            control={
              <Checkbox
                defaultChecked={showOnDashboard}
                onChange={(e) => setShowOnDashboard(e.target.checked)}
              />
            }
            label="Mostrar na Dashboard"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default CategoriesForm;
