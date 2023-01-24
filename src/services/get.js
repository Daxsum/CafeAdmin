import jwtDecode from "jwt-decode";
import http from "./httpService";
import config from "../config.json";
const endApi = config.apiUrl + "/admin/admin-login";
function login(email, password) {
  return http.post(endApi, { email, password });
}
export default login;
