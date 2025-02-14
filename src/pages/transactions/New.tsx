import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";

import TransactionForm from "../../components/TransactionForm";

const formatCurrency = (inputValue: string) => {
  let rawValue = inputValue.replace(/\D/g, "");
  let numericValue = parseFloat(rawValue) / 100;
  return numericValue.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

const NewTransaction = () => {
  const navigate = useNavigate();

  const [amount, setAmount] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (!inputValue) {
      setAmount("");
      return;
    }

    const formattedValue = formatCurrency(inputValue);
    setAmount(formattedValue);
  };

  const handleSave = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formElements = form.elements as typeof form.elements & {
      date: { value: string };
      description: { value: string };
    };

    const amountFixed = parseFloat(
      amount
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

    // Lógica para criar transação
  };

  return (
    <Card component="form" onSubmit={handleSave}>
      <CardContent>
        <Typography variant="h5">Nova Transação</Typography>

        <TransactionForm
          amountValueState={amount}
          handleChange={handleChange}
          setSelectedCategoryId={setSelectedCategoryId}
        />
      </CardContent>
      <CardActions sx={{ justifyContent: "space-between" }}>
        <Button variant="contained" color="info" onClick={() => navigate(-1)}>
          Voltar
        </Button>
        <Button variant="contained" color="success" type="submit">
          Salvar
        </Button>
      </CardActions>
    </Card>
  );
};

export default NewTransaction;
