import axios from "axios";
import { API_URL } from "@env";

const instance = axios.create({
  baseURL: API_URL,
});

instance.defaults.headers.post["Content-Type"] = "application/json";

export default instance;
