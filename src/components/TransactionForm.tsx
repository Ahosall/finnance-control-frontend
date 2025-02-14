import { Box, Grid2 as Grid, MenuItem, TextField } from "@mui/material";
import { useEffect, useState } from "react";

import {
  listCategoriesForDashboard,
  ICategory,
  ITransaction,
} from "../services/api";

interface Props {
  amountValueState: string;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setSelectedCategoryId: any;
  data?: ITransaction;
  readOnly?: boolean;
}

const defaultData: ITransaction = {
  id: "",
  date: new Date(),
  categoryId: "",
  amount: 0,
  description: "",
};

const TransactionForm = (props: Props) => {
  const [transaction, setTransaction] = useState<ITransaction>(defaultData);
  const [categories, setCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    if (props.data) {
      setTransaction(props.data);
    }
  }, [props.data]);

  useEffect(() => {
    (async () => {
      const categoriesApi = await listCategoriesForDashboard();
      setCategories(categoriesApi);
    })();
  }, []);

  return (
    <Box sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 6, md: 4 }}>
          <TextField
            id="date"
            type="date"
            label="Data"
            variant="outlined"
            fullWidth
            defaultValue={transaction.date.toISOString().split("T")[0]}
          />
        </Grid>
        <Grid size={{ xs: 6, md: 4 }}>
          <TextField
            select
            id="category"
            label="Categoria"
            variant="outlined"
            value={transaction.categoryId}
            defaultValue={transaction.categoryId}
            fullWidth
            onChange={(e) => {
              const category = categories.find((c) => c.id === e.target.value);
              if (category && props.readOnly) {
                props.setSelectedCategoryId(category.id);
              }
            }}
          >
            {categories.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <TextField
            label="Valor"
            variant="outlined"
            value={props.amountValueState}
            onChange={props.readOnly ? props.handleChange : () => null}
            disabled={props.readOnly}
            fullWidth
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <TextField
            id="description"
            label="Descrição"
            variant="outlined"
            value={transaction.description}
            defaultValue={transaction.description}
            autoComplete="off"
            fullWidth
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default TransactionForm;
