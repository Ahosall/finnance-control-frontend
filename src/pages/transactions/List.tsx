import { useEffect, useState } from "react";
import { Box, Card, CardContent, IconButton, Typography } from "@mui/material";

import {
  FilterAltOutlined as EnableFilterIcon,
  FilterAltOffOutlined as DisableFilterIcon,
} from "@mui/icons-material";

import { useAuth } from "../../hooks/auth.hook";
import { useCategories } from "../../hooks/categories.hook";

import TransactionsService, {
  TTransactionWithBalance,
} from "../../services/transactions.service";

import TransactionsList from "../../components/TransactionsList";
import TransactionsFilter, {
  IFilters,
} from "../../components/TransactionsFilter";

const ListTransactions = () => {
  const { token } = useAuth();
  const { categories } = useCategories();

  const [transactions, setTrasactions] = useState<TTransactionWithBalance[]>(
    []
  );
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<IFilters | undefined>();

  const handleShowFilters = () => {
    if (!showFilters === false) {
      setFilters(undefined);
    }
    setShowFilters(!showFilters);
  };

  useEffect(() => {
    if (!token) return;

    const transactionsApi = new TransactionsService(token);

    const fetchData = async (f: IFilters) => {
      const start = new Date(f.start + "T12:00:00.000Z");
      const end = new Date(f.end + "T12:00:00.000Z");
      const res = await transactionsApi.listTransactions(
        start,
        end,
        f.categoryId
      );
      setTrasactions(res.data.transactions || []);
    };

    if (filters) {
      fetchData(filters);
    } else {
      const dt = new Date();
      const start = new Date(dt.getFullYear(), dt.getMonth(), 1).toISOString();
      const end = new Date().toISOString();

      fetchData({
        start: start.split("T")[0],
        end: end.split("T")[0],
        categoryId: "dflt",
      });
    }
  }, [filters, token]);

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h5">Transações</Typography>
        <IconButton onClick={handleShowFilters}>
          {showFilters ? <DisableFilterIcon /> : <EnableFilterIcon />}
        </IconButton>
      </Box>

      <Card sx={{ display: showFilters ? "block" : "none", mt: 3 }}>
        <CardContent>
          <TransactionsFilter categories={categories} setFilters={setFilters} />
        </CardContent>
      </Card>

      <TransactionsList transactions={transactions} />
    </Box>
  );
};

export default ListTransactions;
