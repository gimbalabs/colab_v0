import axios from "axios";
import { API_URL } from "@env";
import { Platform } from "react-native";

const instance = axios.create({
  baseURL: API_URL,
});

instance.defaults.headers.post["Content-Type"] = "application/json";

export default instance;
