1. axios 코드 에러

```md
코드명,의미,발생 상황
ERR_NETWORK,네트워크 연결 불가,"인터넷 단절, 서버 다운, CORS 위반 시"
ECONNABORTED,연결 중단,설정한 timeout 시간을 초과했을 때
ERR_CANCELED,요청 취소,AbortController 등으로 요청을 직접 취소했을 때
ERR_BAD_REQUEST,잘못된 요청,서버가 4xx 응답을 보냈을 때
ERR_BAD_RESPONSE,잘못된 응답,서버가 5xx 응답을 보냈을 때
```

2. 에러코드의 response

a) error.response가 없는 경우

- 통신 실패. 서버 구경도 못 해보고 중간에 길이 끊긴 상황
  버로부터 아무런 대답을 듣지 못한 경우입니다. Axios는 이때 error.request는 가지고 있을 수 있지만 response는 undefined가 됩니다.

네트워크 오프라인: 내 컴퓨터 인터넷이 끊겼을 때.

서버 다운: 서버 컴퓨터 전원이 꺼져 있어서 응답을 아예 못 할 때.

CORS 에러: 보안 정책 때문에 브라우저가 응답 읽기를 거부할 때.

타임아웃(Timeout): 서버가 너무 느려서 기다리다 지쳐 브라우저가 연결을 끊었을 때.

요청 취소(Abort): 아까 우리가 본 AbortController로 요청을 중간에 강제로 껐을 때.

b) error.response가 있는 경우
내 요청이 서버 대문(Endpoint)까지 무사히 도착했고, 서버가 나에게 (비록 에러일지라도) 응답을 돌려주었다 는 뜻
data: 서버가 보내준 구체적인 에러 메시지 (예: { "message": "비밀번호가 틀렸습니다" })

status: 400, 500 같은 숫자

headers: 서버가 보낸 응답 헤더
