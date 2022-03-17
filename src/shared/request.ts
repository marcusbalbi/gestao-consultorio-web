import axios from "axios";

const request = axios.create({
  baseURL: "https://tcc-pucminas.herokuapp.com/api",
});

const getToken = () => {
  const loginData = JSON.parse(localStorage.getItem("login") || "");
  if (loginData) {
    return loginData?.token;
  }
  return "";
};

const requestAuth = axios.create({
  baseURL: "https://tcc-pucminas.herokuapp.com/api",
  headers: {
    Authorization: `Bearer ${getToken()}`,
    "Content-Type": "application/json",
  },
});

export { request, requestAuth };
