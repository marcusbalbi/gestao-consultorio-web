import axios from "axios";

const request = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

const getToken = () => {
  const loginData = JSON.parse(localStorage.getItem("login") || "");
  if (loginData) {
    return loginData?.token;
  }
  return "";
};

const requestAuth = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  headers: {
    Authorization: `Bearer ${getToken()}`,
    "Content-Type": "application/json",
  },
});

export { request, requestAuth };
