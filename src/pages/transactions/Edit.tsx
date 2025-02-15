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

const fixFormmatedAmount = (inputValue: string) => {
  return parseFloat(
    inputValue
      .replace(".", "")
      .replace(",", ".")
      .replace(/[^0-9.]/g, "")
  );
};

const EditTransaction = () => {
  const params = useParams();
  const navigate = useNavigate();

  const { token } = useAuth();

  const [transaction, setTransaction] = useState<ITransaction>();
  const [loading, setLoading] = useState(false);

  const handleSave = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (!token || !params.id) return;

    const transactionsApi = new TransactionsService(token);

    const form = e.currentTarget;
    const formElements = form.elements as typeof form.elements & {
      date: { value: string };
      amount: { value: string };
      description: { value: string };
    };

    await transactionsApi
      .editTransaction(
        params.id,
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

  useEffect(() => {
    if (!token) return;

    const transactionsApi = new TransactionsService(token);

    const fetchData = async () => {
      if (params.id) {
        const res = await transactionsApi.getTransactionById(params.id);
        const transactionApi = res.data.transaction;
        if (transactionApi) {
          setTransaction(transactionApi);
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

        <TransactionForm readOnly={loading} transaction={transaction} />
      </CardContent>
      <CardActions sx={{ justifyContent: "space-between" }}>
        <Button variant="contained" color="info" onClick={() => navigate('/transactions')}>
          Voltar
        </Button>

        <Button
          variant="contained"
          color="success"
          type="submit"
          loading={loading}
        >
          Salvar
        </Button>
      </CardActions>
    </Card>
  );
};

export default EditTransaction;
