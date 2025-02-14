import axios, { AxiosInstance } from "axios";

import { API_URL } from "../../config.json";
import { ICategory } from "./categories.service";

export interface ITransaction {
  id: string;
  userId: string;
  categoryId: string;
  amount: number;
  description: string;
  date: string;
  createdAt: Date;
  updatedAt: Date;
}

export type TTransactionWithBalance = ITransaction & {
  category: Partial<ICategory>;
  balance: number;
};

class TransactionsService {
  private api: AxiosInstance;

  constructor(token: string) {
    this.api = axios.create({
      baseURL: API_URL + "/transactions",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async listTransactions(start: Date, end: Date) {
    const startDate = start.toISOString().slice(0, 10);
    const endDate = end.toISOString().slice(0, 10);
    const url = `?start=${startDate}&end=${endDate}`;

    return await this.api.get<{ transactions: TTransactionWithBalance[] }>(url);
  }

  async getTransactionById(transactionId: string) {
    const url = `/${transactionId}`;

    return await this.api.get<{ transaction: ITransaction }>(url);
  }
}

export default TransactionsService;
