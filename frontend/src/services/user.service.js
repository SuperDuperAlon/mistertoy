import { httpService } from "./http.service";

const BASE_URL = "/user/";

export const userService = {
  get,
  signup,
  login,
  logout,
  getEmptyCredentials,
  getLoggedinUser,
};

//Get user by id
function get(userId) {
  return httpService.get(BASE_URL + userId);
}

function signup(credentials) {
  return httpService.post(BASE_URL + "signup", credentials).then(({ data: user }) => {
    _saveLoggedinUser(user);
    return user;
  });
}

function login(credentials) {
  return httpService.post(BASE_URL + "login", credentials).then(({ data: user }) => {
    if (!user) return Promise.reject("Login failed");
    _saveLoggedinUser(user);
    return user;
  });
}

function getEmptyCredentials(name = "", email = "", password = "secret") {
  return { name, email, password };
}

function getLoggedinUser() {
  return JSON.parse(sessionStorage.getItem("loggedinUser") || null);
}

function logout() {
  return httpService.post(BASE_URL + "logout").then(() => {
    sessionStorage.removeItem("loggedinUser");
    return Promise.resolve();
  });
}

function _saveLoggedinUser(user) {
  sessionStorage.setItem("loggedinUser", JSON.stringify(user));
}
