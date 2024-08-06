import axios, { AxiosHeaders } from "axios";
import { IApiResponse, IError } from "models";

// export const BASE_URL = "https://tindubot.hulugram.org/api/v1/";
export const BASE_URL = "https://tindu-api.onrender.com/api/v1/";
export const URL = "https://tindu-api.onrender.com";
//development
// export const BASE_URL = "http://localhost:8000/api/v1/";

const defaultError: IError = {
  errors: ["Network error"],
  message: "Network error",
  status: 400,
};

export function getRequest<T>(url: string): Promise<IApiResponse<T>> {
  return new Promise((resolve) => {
    axios
      .get(`${BASE_URL}${url}`)
      .then((response) => resolve({ data: response.data }))
      .catch((error) => {
        resolve({ error: error?.response?.data ?? defaultError });
      });
  });
}

export function deleteRequest<T>(url: string): Promise<IApiResponse<T>> {
  return new Promise((resolve) => {
    axios
      .delete(`${BASE_URL}${url}`)
      .then((response) => resolve({ data: response.data }))
      .catch((error) => {
        resolve({ error: error?.response?.data ?? defaultError });
      });
  });
}

export function postRequest<T>(
  url: string,
  data: any,
  headers?: { [key: string]: string }
): Promise<IApiResponse<T>> {
  return new Promise((resolve) => {
    console.log(headers);
    axios
      .post(`${BASE_URL}${url}`, data, { headers })
      .then((response) => resolve({ data: response.data }))
      .catch((error) => {
        resolve({ error: error?.response?.data ?? defaultError });
      });
  });
}

export function authorizeGetRequest<T>(
  url: string,
  token: string,
  headers?: { [key: string]: string }
): Promise<IApiResponse<T>> {
  return new Promise((resolve) => {
    axios
      .get(`${BASE_URL}${url}`, {
        headers: { Authorization: `Bearer ${token}`, ...(headers ?? {}) },
      })
      .then((response) => resolve({ data: response.data }))
      .catch((error) =>
        resolve({ error: error?.response?.data ?? defaultError })
      );
  });
}

export function authorizePostRequest<T>(
  url: string,
  data: any,
  token: string
): Promise<IApiResponse<T>> {
  return new Promise((resolve) => {
    axios
      .post(`${BASE_URL}${url}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => resolve({ data: response.data }))
      .catch((error) =>
        resolve({ error: error?.response?.data ?? defaultError })
      );
  });
}
