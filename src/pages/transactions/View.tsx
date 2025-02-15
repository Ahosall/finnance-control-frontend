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
import ConfirmationCard from "../../components/ConfirmationCard";

const ViewTransaction = () => {
  const params = useParams();
  const navigate = useNavigate();

  const { token } = useAuth();

  const [transaction, setTransaction] = useState<ITransaction>();
  const [confirmation, setConfirmation] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!token || !params.id) return;
    setLoading(true);

    const transactionsApi = new TransactionsService(token);

    await transactionsApi
      .deleteTransaction(params.id)
      .then(() => navigate("/transactions"))
      .finally(() => setLoading(false));
  };

  const toNewPage = () => navigate(`/transactions/new`);
  const toEditPage = () => navigate(`/transactions/${params.id}/edit`);

  useEffect(() => {
    const fetchData = async () => {
      if (token && params.id) {
        const transactionsApi = new TransactionsService(token);
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
        <ConfirmationCard
          title="Apagar Transação?"
          message="Você tem certeza que deseja apagar essa transação?"
          handleAction={handleDelete}
          open={confirmation}
          setOpen={setConfirmation}
          loading={loading}
        />
        <TransactionForm readOnly transaction={transaction} />
      </CardContent>
      <CardActions sx={{ justifyContent: "space-between" }}>
        <Button
          variant="contained"
          color="info"
          onClick={() => navigate("/transactions")}
        >
          Voltar
        </Button>

        <Grid container spacing={1}>
          <Grid>
            <Button
              variant="contained"
              color="error"
              onClick={() => setConfirmation(true)}
            >
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
