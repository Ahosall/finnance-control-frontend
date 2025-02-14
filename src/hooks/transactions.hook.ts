import { useEffect, useState } from "react";

import { useAuth } from "../context/auth.context";
import TransactionsService, {
  ITransaction,
} from "../services/transactions.service";

export const useTransactions = (start: Date, end: Date) => {
  const { token } = useAuth();
  const [categories, setCategories] = useState<ITransaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;

    const categoriesApi = new TransactionsService(token);

    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await categoriesApi.listTransactions(start, end);
        setCategories(res.data);
      } catch (error) {
        console.error("Erro ao buscar transações", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  return { categories, loading };
};
