import { useEffect, useState } from "react";
import { Box, Grid2 as Grid, MenuItem, TextField } from "@mui/material";

import { useCategories } from "../hooks/categories.hook";
import { ITransaction } from "../services/transactions.service";

interface Props {
  amountValueState: string;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setSelectedCategoryId: any;
  data?: ITransaction;
  readOnly?: boolean;
}

const defaultData: ITransaction = {
  id: "",
  userId: "",
  categoryId: "",
  amount: 0.0,
  description: "",
  date: new Date().toISOString(),
  createdAt: new Date(),
  updatedAt: new Date(),
};

const TransactionForm = (props: Props) => {
  const { categories } = useCategories();
  const [transaction, setTransaction] = useState<ITransaction>(defaultData);

  useEffect(() => {
    if (props.data) {
      setTransaction(props.data);
    }
  }, [props.data]);

  return (
    <Box sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 6, md: 4 }}>
          <TextField
            id="date"
            type="date"
            label="Data"
            variant="outlined"
            defaultValue={transaction.date.split("T")[0]}
            disabled={props.readOnly}
            fullWidth
          />
        </Grid>
        <Grid size={{ xs: 6, md: 4 }}>
          <TextField
            select
            id="category"
            label="Categoria"
            variant="outlined"
            value={categories.length > 0 ? transaction.categoryId : ""}
            disabled={props.readOnly}
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
            autoComplete="off"
            disabled={props.readOnly}
            fullWidth
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default TransactionForm;
