import axios from "axios";
import { API_URL } from "@env";

const instance = axios.create({
  baseURL: API_URL,
});

export const setAuthorizationToken = (token: string) => {
  instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

instance.defaults.headers.post["Content-Type"] = "application/json";

export default instance;
