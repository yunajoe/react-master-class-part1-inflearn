import axios from "axios";
//  axios 인터셉터로 공통 에러 가공/토큰 주입/로깅.
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
    console.log("우!!!");
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
    console.log("우222!!!");

    // 2xx 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
    // 응답 데이터가 있는 작업 수행
    return response;
  },
  function (error) {
    // 2xx 외의 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
    // 응답 오류가 있는 작업 수행
    return Promise.reject(error);
  },
);
