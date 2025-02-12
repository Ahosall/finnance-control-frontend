import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid2 as Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

import {
  createTransaction,
  editTransaction,
  listCategoriesForDashboard,
  ICategory,
} from "../services/api";

const TransactionForm = ({ id }: { id?: string }) => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
  const [value, setValue] = useState("R$ 0,00");

  const formatCurrency = (inputValue: string) => {
    let rawValue = inputValue.replace(/\D/g, "");
    let numericValue = parseFloat(rawValue) / 100;
    return numericValue.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const inputValue = e.target.value;
    if (!inputValue) {
      setValue("");
      return;
    }

    const formattedValue = formatCurrency(inputValue);
    setValue(formattedValue);
  };

  const handleSave = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formElements: any = form.elements as typeof form.elements & {
      date: { value: string };
      amount: { value: string };
      description: { value: string };
    };

    if (id) {
      await editTransaction(id, {
        date: formElements.date.value,
        categoryId: selectedCategoryId,
        amount: formElements.amount.value,
        description: formElements.description.value,
      });
      return;
    }

    await createTransaction({
      date: formElements.date.value,
      categoryId: selectedCategoryId,
      amount: formElements.amount.value,
      description: formElements.description.value,
    });
  };

  useEffect(() => {
    (async () => {
      const categoriesApi = await listCategoriesForDashboard();
      setCategories(categoriesApi);
    })();
  }, []);

  return (
    <Card component="form" onSubmit={handleSave}>
      <CardContent>
        <Typography variant="h5">Nova transação</Typography>
        <Box sx={{ pt: 3 }}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 6, md: 4 }}>
              <TextField
                id="date"
                type="date"
                label="Data"
                variant="outlined"
                fullWidth
                defaultValue={new Date().toISOString().split("T")[0]}
              />
            </Grid>
            <Grid size={{ xs: 6, md: 4 }}>
              <TextField
                select
                id="category"
                label="Categoria"
                variant="outlined"
                defaultValue=""
                fullWidth
                onChange={(e) => {
                  const category = categories.find(
                    (c) => c.id === e.target.value
                  );
                  if (category) {
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
                value={value}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                id="description"
                label="Descrição"
                variant="outlined"
                autoComplete="off"
                fullWidth
              />
            </Grid>
          </Grid>
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: "end" }}>
        <Button variant="contained" color="success" type="submit">
          Salvar
        </Button>
      </CardActions>
    </Card>
  );
};

export default TransactionForm;
