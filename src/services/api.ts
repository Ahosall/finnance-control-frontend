import axios from "axios";

import { API_URL } from "../../config.json";

/**
 * API Area
 */

const api = axios.create({
  baseURL: API_URL,
});

// Types
export interface ITransaction {
  id: string;
  date: Date;
  categoryId: string;
  amount: number;
  description: string;
}

export interface ICategory {
  id: string;
  name: string;
  type: "EXPENSE" | "INCOME";
  updatedAt: number;
}

export type TCategoryForDashboard = { total: number } & ICategory;

type TListTransactionsFunction = () => Promise<ITransaction[]>;
type TGetTransactionFunction = (id: string) => Promise<ITransaction | null>;

type TListCategoriesFunction = () => Promise<ICategory[]>;
type TListCategoriesDashboardFunction = () => Promise<TCategoryForDashboard[]>;

// Data

const categories: ICategory[] = [
  {
    id: "a",
    name: "Salário",
    type: "INCOME",
    updatedAt: Date.now() - 1000 * 60 * 60 * 24 * 12,
  },
  {
    id: "b",
    name: "Outras Receitas",
    type: "INCOME",
    updatedAt: Date.now() - 1000 * 60 * 60 * 24 * 10,
  },
  {
    id: "c",
    name: "Despesas Variáveis",
    type: "EXPENSE",
    updatedAt: Date.now() - 1000 * 60 * 60 * 24 * 10,
  },
  {
    id: "d",
    name: "Despesas Obrigatórias",
    type: "EXPENSE",
    updatedAt: Date.now() - 1000 * 60 * 60 * 24 * 16,
  },
];

const categoriesForDashboard: TCategoryForDashboard[] = [
  {
    id: "a",
    name: "Salário",
    total: 2700,
    type: "INCOME",
    updatedAt: Date.now() - 1000 * 60 * 60 * 24 * 12,
  },
  {
    id: "d",
    name: "Despesas Obrigatórias",
    total: 2970,
    type: "EXPENSE",
    updatedAt: Date.now() - 1000 * 60 * 60 * 24 * 16,
  },
  {
    id: "b",
    name: "Outras Receitas",
    total: 480,
    type: "INCOME",
    updatedAt: Date.now() - 1000 * 60 * 60 * 24 * 10,
  },
  {
    id: "c",
    name: "Despesas Variáveis",
    total: 210,
    type: "EXPENSE",
    updatedAt: Date.now() - 1000 * 60 * 60 * 24 * 10,
  },
];

/**
 * API Functions Area
 */
export const listTransactions = async (
  token: string,
  startDate: Date,
  endDate: Date
) => {
  const url = `/transactions?start=${startDate.toISOString()}&end=${endDate.toISOString()}`;
  const conf = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return await api.get(url, conf).then((res) => {
    return res.data.transactions;
  });
};

export const getTransactionById: TGetTransactionFunction = async (id) => {
  const transaction = transactions.find((t) => t.id === id);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(transaction || null);
    }, 200);
  });
};

export const listCategories: TListCategoriesFunction = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(categories), 300);
  });
};

export const listCategoriesForDashboard: TListCategoriesDashboardFunction =
  async () => {
    return new Promise((resolve) => {
      categoriesForDashboard.sort((a, b) => {
        if (a.type !== b.type) {
          return a.type === "INCOME" ? -1 : 1;
        }

        return a.updatedAt - b.updatedAt;
      });

      setTimeout(() => {
        resolve(categoriesForDashboard);
      }, 300);
    });
  };

export const createTransaction = async (data: Partial<ITransaction>) => {};

export const editTransaction = async (
  id: string,
  data: Partial<ITransaction>
) => {};
