export const normalizeAxiosError = (error) => {
  if (!error.response) {
    return "인터넷 연결을 확인하세요.";
  }

  // 코드별
  if (error.code === "ERR_NETWORK") {
    return "네트워크 연결이 끊어졌습니다.";
  }
  if (error.code === "ECONNABORTED") {
    return "요청한 시간이 지났습니다.";
  }
  if (error.code === "ERR_BAD_REQUEST") {
    return "잘못된 요청입니다.";
  }
  if (error.code === "ERR_BAD_RESPONSE") {
    return "잘못된 응답입니다.";
  }
  // 상태별
  const { status } = error.response;
  if (status === 404) return "데이터를 찾을 수 없습니다.";
  if (status >= 500) {
    return "서버에 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.";
  }
  return "알 수 없는 에러가 생겼습니다.";
};
