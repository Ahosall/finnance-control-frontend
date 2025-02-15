import axios, { AxiosInstance } from "axios";

import { API_URL } from "../../config.json";

interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

interface ILogin {
  token: string;
  user: IUser;
}

class UsersService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_URL + "/users",
    });
  }

  async createUser(name: string, email: string, password: string) {
    return await this.api.post("/", { name, email, password });
  }

  async loginUser(email: string, password: string) {
    return this.api.post<ILogin>("/login", { email, password });
  }

  async getMyUser(token: string) {
    return this.api.get<IUser>("/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}

export default UsersService;
