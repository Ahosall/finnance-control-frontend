import { useEffect, useState } from "react";
import { Box, Grid2 as Grid, MenuItem, TextField } from "@mui/material";

import { useCategories } from "../hooks/categories.hook";
import { ITransaction } from "../services/transactions.service";

interface Props {
  transaction?: ITransaction;
  readOnly?: boolean;
}

const formatCurrency = (inputValue: string) => {
  let rawValue = inputValue.replace(/\D/g, "");
  let numericValue = parseFloat(rawValue) / 100;
  return numericValue.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

const TransactionForm = ({ transaction, readOnly }: Props) => {
  const { categories } = useCategories();

  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    if (!transaction) return;

    if (categories.length > 0) {
      setSelectedCategoryId(transaction.categoryId);
    }

    setDate(transaction.date.split("T")[0]);
    setAmount(formatCurrency(`${transaction.amount * 100}`));
  }, [transaction, categories]);

  return (
    <Box sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 6, md: 4 }}>
          <TextField
            id="date"
            type="date"
            label="Data"
            variant="outlined"
            value={date}
            disabled={readOnly}
            fullWidth
            onChange={(e) => {
              setDate(e.target.value);
            }}
          />
        </Grid>
        <Grid size={{ xs: 6, md: 4 }}>
          <TextField
            select
            name="category"
            label="Categoria"
            variant="outlined"
            value={selectedCategoryId}
            disabled={readOnly}
            fullWidth
            onChange={(e) => {
              const category = categories.find((c) => c.id === e.target.value);
              if (category && !readOnly) {
                setSelectedCategoryId(category.id);
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
            id="amount"
            label="Valor"
            variant="outlined"
            value={amount}
            disabled={readOnly}
            autoComplete="off"
            fullWidth
            onChange={(e) => {
              const formatedAmount = formatCurrency(e.target.value);
              setAmount(formatedAmount);
            }}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <TextField
            id="description"
            label="Descrição"
            variant="outlined"
            value={transaction ? transaction.description : ""}
            disabled={readOnly}
            autoComplete="off"
            fullWidth
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default TransactionForm;
