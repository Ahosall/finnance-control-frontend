import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";

import TransactionForm from "../../components/TransactionForm";
import TransactionsService from "../../services/transactions.service";
import { useAuth } from "../../hooks/auth.hook";
import { useState } from "react";

const fixFormmatedAmount = (inputValue: string) => {
  return parseFloat(
    inputValue
      .replace(".", "")
      .replace(",", ".")
      .replace(/[^0-9.]/g, "")
  );
};

const NewTransaction = () => {
  const navigate = useNavigate();

  const { token } = useAuth();

  const [loading, setLoading] = useState(false);

  const handleSave = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (!token) return;

    const transactionsApi = new TransactionsService(token);

    const form = e.currentTarget;
    const formElements = form.elements as typeof form.elements & {
      date: { value: string };
      amount: { value: string };
      description: { value: string };
    };

    await transactionsApi
      .createTransaction(
        new Date(formElements.date.value),
        (form.elements as any)[2].value,
        fixFormmatedAmount(formElements.amount.value),
        formElements.description.value
      )
      .then((res) => {
        navigate(`/transactions/${res.data.transaction.id}`);
      })
      .finally(() => setLoading(false));
  };

  return (
    <Card component="form" onSubmit={handleSave}>
      <CardContent>
        <Typography variant="h5">Nova Transação</Typography>

        <TransactionForm readOnly={loading} />
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
