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
  updatedAt: number;
}

type TCategoriesForDashboardFunction = () => Promise<ICategory[]>;

export const listCategoriesForDashboard: TCategoriesForDashboardFunction =
  async () => {
    return new Promise((resolve) => {
      const transactions: ICategory[] = [
        {
          id: "a",
          name: "Salário",
          total: Math.random() * 3000,
          type: "INCOME",
          updatedAt: Date.now() - 1000 * 60 * 60 * 24 * 12,
        },
        {
          id: "d",
          name: "Despesas Obrigatórias",
          total: Math.random() * 1000,
          type: "EXPENSE",
          updatedAt: Date.now() - 1000 * 60 * 60 * 24 * 10,
        },
        {
          id: "b",
          name: "Outras Receitas",
          total: Math.random() * 50,
          type: "INCOME",
          updatedAt: Date.now() - 1000 * 60 * 60 * 24 * 10,
        },
        {
          id: "c",
          name: "Despesas Variáveis",
          total: Math.random() * 500,
          type: "EXPENSE",
          updatedAt: Date.now() - 1000 * 60 * 60 * 24 * 12,
        },
      ];

      transactions.sort((a, b) => {
        if (a.type !== b.type) {
          return a.type === "INCOME" ? -1 : 1;
        }

        // Se forem do mesmo tipo, ordena por data (mais recente primeiro)
        return a.updatedAt - b.updatedAt;
      });

      setTimeout(() => {
        resolve(transactions);
      }, 300);
    });
  };

export const createTransaction = async (data: ITransaction) => {};

export const editTransaction = async (id: string, data: ITransaction) => {};
