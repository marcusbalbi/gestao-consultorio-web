import axios from "axios";

const request = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

request.interceptors.request.use((config) => {
  if (process.env.NODE_ENV !== "production") {
    console.log("REQUEST_LOGGER", {
      method: config.method,
      url: config.url,
      data: config.data,
    });
  }
  return config;
});

request.interceptors.response.use(
  (config) => {
    if (process.env.NODE_ENV !== "production") {
      console.log("RESPONSE_LOGGER", {
        data: config.data,
        status: config.status,
      });
    }
    return config;
  },
  (err) => {
    if (process.env.NODE_ENV !== "production") {
      console.log("RESPONSE_LOGGER_ERROR", {
        data: err.response.data,
        status: err.response.status,
        err: err,
      });
    }
    return Promise.reject(err);
  }
);

export { request };
