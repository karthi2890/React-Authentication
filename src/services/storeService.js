import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/store/list/customers";

export function getStores() {
  console.log(http.get(apiEndpoint));
  return http.get(apiEndpoint);
}
