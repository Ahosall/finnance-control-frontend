/**
 * API Area
 */

export interface ITransaction {
  date: string;
  categoryId: string;
  amount: number;
  description: string;
}

export interface ICategory {
  id: string;
  name: string;
  total: number;
  type: "EXPENSE" | "INCOME";
}

type TCategoriesForDashboardFunction = () => Promise<ICategory[]>;

export const listCategoriesForDashboard: TCategoriesForDashboardFunction =
  async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: "a",
            name: "Salário",
            total: Math.random() * 3000,
            type: "INCOME",
          },
          {
            id: "b",
            name: "Doações",
            total: Math.random() * 50,
            type: "INCOME",
          },
          {
            id: "c",
            name: "Despesas Variáveis",
            total: Math.random() * 500,
            type: "EXPENSE",
          },
          {
            id: "d",
            name: "Despesas Obrigatórias",
            total: Math.random() * 1000,
            type: "EXPENSE",
          },
        ]);
      }, 300);
    });
  };

export const createTransaction = (data: ITransaction) => {};

export const editTransaction = (id: string, data: ITransaction) => {};
