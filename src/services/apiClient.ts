import axios, { AxiosError } from "axios";
import { normalizeError } from "./normalizeError";

// Declaration Merging
declare module "axios" {
  export interface AxiosRequestConfig {
    __retryCount?: number;
  }
}

const instance = axios.create({
  baseURL: "https://fakestoreapi.com",
  timeout: 8000,
  headers: { "Content-Type": "application/json" },
});

// 요청 인터셉터 추가하기
instance.interceptors.request.use(
  function (config) {
    // 요청이 전달되기 전에 작업 수행
    return config;
  },
  function (error) {
    // 요청 오류가 있는 작업 수행
    return Promise.reject(error);
  },
);

// 응답 인터셉터 추가하기
instance.interceptors.response.use(
  function (response) {
    // 2xx 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
    // 응답 데이터가 있는 작업 수행
    return response;
  },
  function (error: AxiosError) {
    // 500번 에러일때 retry
    const MAX_RETRY = 3;
    const { config, response } = error;

    if (
      response &&
      response?.status >= 500 &&
      (config?.__retryCount || 0) < MAX_RETRY
    ) {
      console.log("앙앙!");
      if (config) {
        config.__retryCount = (config.__retryCount || 0) + 1;
      }

      return config;
    }

    const errorMessage = normalizeError(error);
    console.log("errorMessage", errorMessage);
    if (errorMessage) {
      error.message = errorMessage;
    }
    // 2xx 외의 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
    // 응답 오류가 있는 작업 수행
    return Promise.reject(error);
  },
);

export default instance;
