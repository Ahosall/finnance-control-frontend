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

  async createTransaction(
    date: Date,
    categoryId: string,
    amount: number,
    description: string
  ) {
    const data = {
      date,
      categoryId,
      amount,
      description,
    };
    return await this.api.post<{ transaction: ITransaction }>("/", data);
  }

  async listTransactions(start: Date, end: Date, categoryId?: string) {
    const startDate = start.toISOString().slice(0, 10);
    const endDate = end.toISOString().slice(0, 10);
    let url = `?start=${startDate}&end=${endDate}`;
    url += categoryId ? `&categoryId=${categoryId}` : "";

    return await this.api.get<{ transactions: TTransactionWithBalance[] }>(url);
  }

  async getTransactionById(transactionId: string) {
    const url = `/${transactionId}`;

    return await this.api.get<{ transaction: ITransaction }>(url);
  }

  async editTransaction(
    transactionId: string,
    date: Date,
    categoryId: string,
    amount: number,
    description: string
  ) {
    const url = `/${transactionId}`;
    const data = {
      date,
      categoryId,
      amount,
      description,
    };
    return await this.api.put<{ transaction: ITransaction }>(url, data);
  }

  async deleteTransaction(transactionId: string) {
    const url = `/${transactionId}`;

    return await this.api.delete(url);
  }
}

export default TransactionsService;
