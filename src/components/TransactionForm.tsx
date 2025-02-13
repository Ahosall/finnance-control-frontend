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
  ITransaction,
  getTransactionById,
} from "../services/api";
import { useNavigate } from "react-router-dom";

const formatCurrency = (inputValue: string) => {
  let rawValue = inputValue.replace(/\D/g, "");
  let numericValue = parseFloat(rawValue) / 100;
  return numericValue.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

const defaultData = {
  id: "",
  date: new Date(),
  amount: 0.0,
  categoryId: "",
  description: "",
};

interface Props {
  transactionId?: string;
  mode?: "view" | "edit";
}

const TransactionForm = ({ transactionId, mode }: Props) => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState<ICategory[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
  const [value, setValue] = useState("R$ 0,00");
  const [transaction, setTransaction] = useState<ITransaction>(defaultData);

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

    if (mode === "view") {
      return;
    }

    const form = e.currentTarget;
    const formElements = form.elements as typeof form.elements & {
      date: { value: string };
      description: { value: string };
    };

    const amountFixed = parseFloat(
      value
        .replace(".", "")
        .replace(",", ".")
        .replace(/[0-9.]/g, "")
    );

    const data = {
      date: new Date(formElements.date.value),
      categoryId: selectedCategoryId,
      amount: amountFixed,
      description: formElements.description.value,
    };

    if (transactionId && mode === "edit") {
      await editTransaction(transactionId, data);
      return;
    }

    await createTransaction(data);
  };

  useEffect(() => {
    (async () => {
      const categoriesApi = await listCategoriesForDashboard();
      setCategories(categoriesApi);

      if (transactionId) {
        const transactionApi = await getTransactionById(transactionId);
        if (transactionApi) {
          setTransaction(transactionApi);
          const formattedValue = formatCurrency(
            transactionApi.amount.toString()
          );
          setValue(formattedValue);
        } else {
          navigate(-1);
        }
      }
    })();
  }, []);

  return (
    <Card component="form" onSubmit={handleSave}>
      <CardContent>
        <Typography variant="h5">
          {mode === "edit" ? "Editar " : mode === "view" ? "" : "Registrar "}
          Transação
        </Typography>
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
                defaultValue={transaction.categoryId}
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
                defaultValue={transaction.description}
                autoComplete="off"
                fullWidth
              />
            </Grid>
          </Grid>
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: mode ? "space-between" : "end" }}>
        <Button variant="contained" color="info">
          Voltar
        </Button>

        <Grid container spacing={1}>
          <Grid size={6}>
            <Button variant="contained" color="warning">
              Editar
            </Button>
          </Grid>
          <Grid size={6}>
            <Button variant="contained" color="success">
              Novo
            </Button>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

export default TransactionForm;
