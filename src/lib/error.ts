import axios, { AxiosError } from "axios";

export const normalizeAxiosError = (error: AxiosError) => {
  // 1. 요청 취소 (AbortController) - 사용자에게 에러를 보여줄 필요가 없음
  if (axios.isCancel(error)) return null;

  // 2. 응답 자체가 없는 경우 (진짜 네트워크 문제)
  if (!error.response) {
    if (error.code === "ECONNABORTED") {
      return "요청한 시간이 지났습니다.";
    }
    return "네트워크 연결이 불안정합니다. 연결 상태를 확인해주세요.";
  }

  // 3. 서버 응답이 있는 경우 (상태 코드별 처리)
  const status = error.response.status;

  // 404: 데이터가 없음
  if (status === 404) return "요청하신 정보를 찾을 수 없습니다.";

  // 400 클라이언트 잘못 (BAE REQUEST)
  if (status === 400 || error.code === "ERR_BAD_REQUEST") {
    return "잘못된 요청입니다.";
  }

  // 500 이상
  if (status >= 500 || error.code === "ERR_BAD_RESPONSE") {
    return "서버에 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.";
  }
  return "알 수 없는 에러가 생겼습니다.";
};
