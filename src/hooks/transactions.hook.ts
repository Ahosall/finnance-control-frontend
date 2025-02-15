import { useEffect, useState } from "react";

import { useAuth } from "./auth.hook";
import TransactionsService, {
  ITransaction,
} from "../services/transactions.service";

export const useTransactions = (start: Date, end: Date) => {
  const { token } = useAuth();
  const [transactions, setTrasactions] = useState<ITransaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;

    const categoriesApi = new TransactionsService(token);

    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await categoriesApi.listTransactions(start, end);
        setTrasactions(res.data.transactions);
      } catch (error) {
        console.error("Erro ao buscar transações", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  return { transactions, loading };
};
