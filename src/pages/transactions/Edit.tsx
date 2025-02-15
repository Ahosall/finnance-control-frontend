import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";

import { useAuth } from "../../hooks/auth.hook";

import TransactionsService, {
  ITransaction,
} from "../../services/transactions.service";

import TransactionForm from "../../components/TransactionForm";

const formatCurrency = (inputValue: string) => {
  let rawValue = inputValue.replace(/\D/g, "");
  let numericValue = parseFloat(rawValue) / 100;
  return numericValue.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

const EditTransaction = () => {
  const params = useParams();
  const navigate = useNavigate();

  const { token } = useAuth();

  const [amount, setAmount] = useState("");
  const [transaction, setTransaction] = useState<ITransaction>();

  const handleSave = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (!token) return;

    const transactionsApi = new TransactionsService(token);

    const fetchData = async () => {
      if (params.id) {
        const res = await transactionsApi.getTransactionById(params.id);
        const transactionApi = res.data.transaction;
        if (transactionApi) {
          const formattedValue = formatCurrency(`${transactionApi.amount}`);
          setTransaction(transactionApi);
          setAmount(formattedValue);
        } else {
          navigate(-1);
        }
      }
    };

    fetchData();
  }, [token]);

  return (
    <Card component="form" onSubmit={handleSave}>
      <CardContent>
        <Typography variant="h5">Editar Transação</Typography>

        <TransactionForm
          data={transaction}
          amountValueState={amount}
          setSelectedCategoryId={() => null}
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

export default EditTransaction;
