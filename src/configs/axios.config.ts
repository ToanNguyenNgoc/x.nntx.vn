/* eslint-disable @typescript-eslint/no-explicit-any */
import queryString from "query-string";
import axios from 'axios'

interface AxiosConfigProps {
  baseURL?: string,
  argToken?:string
}

export const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
// export const API_URL = 'http://localhost:8000/api';

export const AxiosConfig = (props?: AxiosConfigProps) => {
  const baseURL = props?.baseURL || API_URL
  const config = axios.create({
    baseURL: baseURL,
    headers: {
      "Accept": "application/json, text/plain, */*",
      "Content-Type": "application/json"
    },
    paramsSerializer: {
      encode: () => { },
      serialize: (params: any) => queryString.stringify(params),
      indexes: false,
    },
  })

  config.interceptors.request.use(async (headerConfig) => {
    const { token } = await validateRefreshToken();
    headerConfig.headers.Authorization = `Bearer ${props?.argToken || token}`
    return headerConfig;
  });
  config.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      throw error;
    }
  );
  return config
}

const validateRefreshToken = async () => {
  const token = localStorage.getItem('api_token')
  return {
    token
  }
}