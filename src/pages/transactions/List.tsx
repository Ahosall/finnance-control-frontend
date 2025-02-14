import { useEffect, useState } from "react";
import { Box, Card, CardContent, IconButton, Typography } from "@mui/material";

import {
  FilterAltOutlined as EnableFilterIcon,
  FilterAltOffOutlined as DisableFilterIcon,
} from "@mui/icons-material";

import { useCategories } from "../../hooks/categories.hook";
import { useAuth } from "../../context/auth.context";
import TransactionsService, {
  TTransactionWithBalance,
} from "../../services/transactions.service";
import TransactionsList from "../../components/TransactionsList";
import TransactionsFilter from "../../components/TransactionsFilter";

const ListTransactions = () => {
  const { token } = useAuth();
  const { categories } = useCategories();

  const [transactions, setTrasactions] = useState<TTransactionWithBalance[]>(
    []
  );
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (!token) return;

    const transactionsApi = new TransactionsService(token);

    const fetchData = async () => {
      const date = new Date();
      const start = new Date(date.getFullYear(), date.getMonth(), 1);
      const res = await transactionsApi.listTransactions(
        new Date(start),
        new Date()
      );
      setTrasactions(res.data.transactions || []);
    };

    fetchData();
  }, [token]);

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h5">Transações</Typography>
        <IconButton onClick={() => setShowFilters(!showFilters)}>
          {showFilters ? <DisableFilterIcon /> : <EnableFilterIcon />}
        </IconButton>
      </Box>

      <Card sx={{ display: showFilters ? "block" : "none", mt: 3 }}>
        <CardContent>
          <TransactionsFilter categories={categories} />
        </CardContent>
      </Card>

      <Card sx={{ mt: 3 }}>
        <CardContent>
          <TransactionsList transactions={transactions} />
        </CardContent>
      </Card>
    </Box>
  );
};

export default ListTransactions;
