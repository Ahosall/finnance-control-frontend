import axios, { AxiosInstance } from "axios";

import { API_URL } from "../../config.json";

export interface ICategory {
  id: string;
  name: string;
  type: "INCOME" | "EXPENSE";
  showOnDashboard?: boolean;
  createdAt: Date;
}

export type TCategoriesForDashboard = Array<ICategory & { total: number }>;

class CategoriesService {
  private api: AxiosInstance;

  constructor(token: string) {
    this.api = axios.create({
      baseURL: API_URL + "/categories",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async listCategories() {
    return await this.api.get<{ categories: ICategory[] }>("/");
  }

  async getCategoriesForDashboard() {
    const url = "?onlyForDashboard=true";
    const res = await this.api.get<{ categories: TCategoriesForDashboard }>(
      url
    );
    return res;
  }

  async updateCategory(categoryId: string, data: Partial<ICategory>) {
    const url = `/${categoryId}`;
    const res = await this.api.put<{ categories: TCategoriesForDashboard }>(
      url,
      data
    );
    return res;
  }
}

export default CategoriesService;
