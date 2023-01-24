import http from "./httpService";
import config from "../config.json";
const endApi = config.apiUrl + "/admin/admin";
function register(user) {
  return http.post(endApi, {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    password: user.password,
    passwordConfirm: user.passwordConfirm,
  });
}
export default register;
