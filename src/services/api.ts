/**
 * API Area
 */

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
const transactions: ITransaction[] = [
  {
    id: "z",
    date: new Date("2025-02-12T12:00:00"),
    description: "Compras diversas",
    amount: 210,
    categoryId: "c",
  },
  {
    id: "y",
    date: new Date("2025-02-11T12:00:00"),
    description: "Pgto. Aluguel Casa",
    amount: 2600,
    categoryId: "d",
  },
  {
    id: "x",
    date: new Date("2025-02-09T12:00:00"),
    description: "Lucro com ações",
    amount: 480,
    categoryId: "b",
  },
  {
    id: "w",
    date: new Date("2025-02-08T12:00:00"),
    description: "Pgto. Agua e Luz",
    amount: 370,
    categoryId: "d",
  },
  {
    id: "t",
    date: new Date("2025-02-07T12:00:00"),
    description: "Recebimento salário",
    amount: 2700,
    categoryId: "a",
  },
];

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
export const listTransactions: TListTransactionsFunction = async () => {
  transactions.sort((a, b) => b.date.getTime() - a.date.getTime());

  return new Promise((resolve) => {
    resolve(transactions);
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
