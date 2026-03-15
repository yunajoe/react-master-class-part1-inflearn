import { AxiosError } from "axios";

export const normalizeError = (error: AxiosError) => {
  // 응답이 없을떄 (네트워크 X, "ERR_CANCELED" 는 제외)
  if (!error.response) {
    if (error.code === "ERR_CANCELED") {
      return null;
    }
    if (error.code === "ECONNABORTED") {
      return "요청 시간이 지났습니다.";
    }
    return "네트워크 에러가 났습니다.";
  }

  // 응답이 있을 때
  const { response, status, code } = error;
  // 1. 400 대 에러
  if (status === 400 || code === "BAD_REQUEST") {
    return "잘못된 요청입니다";
  }
  if (status === 404) {
    return "데이터가 없습니다";
  }
  /// 2. 500 대 에러
  if (status >= 500) {
    return "서버에러가 발생하였습니다";
  }
  return "알 수 없는 에러가 났습니다.";
};
