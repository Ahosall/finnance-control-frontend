import { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid2 as Grid,
  Typography,
} from "@mui/material";

import TransactionForm from "../../components/TransactionForm";

import { getTransactionById, ITransaction } from "../../services/api";
import { useNavigate, useParams } from "react-router-dom";

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

  const [amount, setAmount] = useState("");
  const [transaction, setTransaction] = useState<ITransaction>();

  const toNewPage = () => navigate(`/transactions/new`);
  const toEditPage = () => navigate(`/transactions/${params.id}/edit`);

  useEffect(() => {
    (async () => {
      if (params.id) {
        const transactionApi = await getTransactionById(params.id);
        if (transactionApi) {
          const formattedValue = formatCurrency(`${transactionApi.amount}`);
          setTransaction(transactionApi);
          setAmount(formattedValue);
        } else {
          navigate(-1);
        }
      }
    })();
  }, []);

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">Editar Transação</Typography>

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

export default EditTransaction;
