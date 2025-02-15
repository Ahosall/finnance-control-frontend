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

const ViewTransaction = () => {
  const params = useParams();
  const navigate = useNavigate();

  const { token } = useAuth();

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
          setTransaction(transactionApi);
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
        <Typography variant="h5" sx={{ textTransform: "capitalize" }}>
          {transaction ? transaction.description : "Transação"}
        </Typography>

        <TransactionForm readOnly transaction={transaction} />
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
