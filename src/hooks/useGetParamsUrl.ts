import queryString from "query-string";
import { useLocation } from "react-router-dom";

export function useGetParamsUrl<T>() {
  const location = useLocation();
  const params = queryString.parse(location.search) as T;
  return params
}