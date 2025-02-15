import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid2 as Grid,
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

const ViewTransaction = () => {
  const params = useParams();
  const navigate = useNavigate();

  const { token } = useAuth();

  const [amount, setAmount] = useState("");
  const [transaction, setTransaction] = useState<ITransaction>();

  const toNewPage = () => navigate(`/transactions/new`);
  const toEditPage = () => navigate(`/transactions/${params.id}/edit`);

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
    <Card>
      <CardContent>
        <Typography variant="h5">Visualizando Transação</Typography>

        <TransactionForm
          readOnly
          data={transaction}
          amountValueState={amount}
          setSelectedCategoryId={() => null}
        />
      </CardContent>
      <CardActions sx={{ justifyContent: "space-between" }}>
        <Button variant="contained" color="info" onClick={() => navigate(-1)}>
          Voltar
        </Button>

        <Grid container spacing={1}>
          <Grid>
            <Button variant="contained" color="error">
              Apagar
            </Button>
          </Grid>
          <Grid>
            <Button variant="contained" color="warning" onClick={toEditPage}>
              Editar
            </Button>
          </Grid>
          <Grid>
            <Button variant="contained" color="success" onClick={toNewPage}>
              Novo
            </Button>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

export default ViewTransaction;
