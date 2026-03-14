import axios from "axios";
import { normalizeAxiosError } from "./error";
import { sleep } from "./sleep";
const instance = axios.create({
  baseURL: "https://fakestoreapi.com",
  timeout: 8000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;

instance.interceptors.request.use(
  function (config) {
    console.log("요청!!!");
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    // 요청이 전달되기 전에 작업 수행
    return config;
  },
  function (error) {
    console.log("요청 에러", error);
    // 요청 오류가 있는 작업 수행
    return Promise.reject(error);
  },
);

// 응답 인터셉터 추가하기
instance.interceptors.response.use(
  function (response) {
    console.log("응답");
    // 2xx 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
    // 응답 데이터가 있는 작업 수행
    return response;
  },
  async function (error) {
    console.log("응답 에러", error);
    const { config, response } = error;

    // 서버에러가 날 경우 재시도 정색
    const MAX_RETRY = 3;
    config._retryCount = config._retryCount ?? 0;
    if (response && response.status >= 500 && config._retryCouunt < MAX_RETRY) {
      config._retryCount += 1;
      const delay = Math.pow(2, config._retryCount - 1) * 1000;
      await sleep(delay);
      return instance(config);
    }

    const errorMessage = normalizeAxiosError(error);
    if (errorMessage) {
      error.message = errorMessage;
    }

    // 2xx 외의 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
    // 응답 오류가 있는 작업 수행
    return Promise.reject(error);
  },
);
