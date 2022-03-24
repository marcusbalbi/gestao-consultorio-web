import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

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

const instances = [request];

export const addGlobalRequestInterceptor = (
  onFulfilled?: (
    value: AxiosRequestConfig
  ) => AxiosRequestConfig | Promise<AxiosRequestConfig>,
  onRejected?: (error: any) => any
) => {
  const ids: number[] = [];
  for (let instance of instances) {
    const id = instance.interceptors.request.use(onFulfilled, onRejected);
    ids.push(id);
  }
  return ids;
};
export const removeGlobalRequestInterceptor = (ids: number[]) => {
  ids.forEach((id, index) => {
    instances[index].interceptors.request.eject(id);
  });
};

export const addGlobalResponseInterceptor = (
  onFulfilled?: (
    value: AxiosResponse
  ) => AxiosResponse | Promise<AxiosResponse>,
  onRejected?: (error: any) => any
) => {
  const ids: number[] = [];
  for (let instance of instances) {
    const id = instance.interceptors.response.use(onFulfilled, onRejected);
    ids.push(id);
  }
  return ids;
};
export const removeGlobalResponseInterceptor = (ids: number[]) => {
  ids.forEach((id, index) => {
    instances[index].interceptors.response.eject(id);
  });
};

export { request };
