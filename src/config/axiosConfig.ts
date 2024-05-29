import axios from "axios";
export type { AxiosRequestConfig as RequestConfig } from "axios";

const BASE_URL = "https://api.restful-api.dev";

export const AxiosConfig = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json", Accept: "application/json" },
  timeout: 60000,
});
