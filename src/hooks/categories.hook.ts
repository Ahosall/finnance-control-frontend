import { useEffect, useState } from "react";

import { useAuth } from "../context/auth.context";
import CategoriesService, {
  ICategory,
  TCategoriesForDashboard,
} from "../services/categories.service";

export const useCategories = () => {
  const { token } = useAuth();
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;

    const categoriesApi = new CategoriesService(token);

    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await categoriesApi.listCategories();
        setCategories(res.data.categories);
      } catch (error) {
        console.error("Erro ao buscar categorias", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  return { categories, loading };
};

export const useCategoriesForDashboard = () => {
  const { token } = useAuth();
  const [categoriesForDashboard, setCategoriesForDashboard] =
    useState<TCategoriesForDashboard>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;

    const categoriesApi = new CategoriesService(token);

    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await categoriesApi.getCategoriesForDashboard();
        setCategoriesForDashboard(res.data.categories);
      } catch (error) {
        console.error("Erro ao buscar categorias para a Dashboard", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  return { categoriesForDashboard, loading };
};
