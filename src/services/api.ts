/**
 * API Area
 */

export interface ITransaction {
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

export type TCategoryForDashboard = {
  total: number;
} & ICategory;

type TListTransactionsFunction = () => Promise<ITransaction[]>;
type TListCategoriesFunction = () => Promise<ICategory[]>;
type TListCategoriesDashboardFunction = () => Promise<TCategoryForDashboard[]>;

export const listTransactions: TListTransactionsFunction = async () => {
  const transactions: ITransaction[] = [
    {
      date: new Date("2025-02-12T12:00:00"),
      description: "Compras diversas",
      amount: 210,
      categoryId: "c",
    },
    {
      date: new Date("2025-02-11T12:00:00"),
      description: "Pgto. Aluguel Casa",
      amount: 2600,
      categoryId: "d",
    },
    {
      date: new Date("2025-02-09T12:00:00"),
      description: "Lucro com ações",
      amount: 480,
      categoryId: "b",
    },
    {
      date: new Date("2025-02-08T12:00:00"),
      description: "Pgto. Agua e Luz",
      amount: 370,
      categoryId: "d",
    },
    {
      date: new Date("2025-02-07T12:00:00"),
      description: "Recebimento salário",
      amount: 2700,
      categoryId: "a",
    },
  ];

  transactions.sort((a, b) => b.date.getTime() - a.date.getTime());

  return new Promise((resolve) => {
    resolve(transactions);
  });
};

export const listCategoriesForDashboard: TListCategoriesDashboardFunction =
  async () => {
    return new Promise((resolve) => {
      const categories: TCategoryForDashboard[] = [
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

      categories.sort((a, b) => {
        if (a.type !== b.type) {
          return a.type === "INCOME" ? -1 : 1;
        }

        return a.updatedAt - b.updatedAt;
      });

      setTimeout(() => {
        resolve(categories);
      }, 300);
    });
  };

export const listCategories: TListCategoriesFunction = async () => {
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

  return new Promise((resolve) => {
    setTimeout(() => resolve(categories), 300);
  });
};

export const createTransaction = async (data: ITransaction) => {};

export const editTransaction = async (id: string, data: ITransaction) => {};
