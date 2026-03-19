## 주제: 데이터 패칭과 비동기 처리 고도화

1. HTTP 요청과 useEffect — 데이터 가져오기 준비하기

1-1) 정의

- HTTP 요청: 브라우저(클라이언트)가 서버에 “이 자료를 주세요!”라고 요청하는 메시지.
- 렌더링과 요청의 분리: 렌더링 단계는 DOM을 만드는 계산 단계이므로 느린 네트워크 요청을 포함하면 화면이 멈출 수 있음. 따라서 렌더링이 끝난 뒤 실행되는 useEffect에서 요청 수행.
- 실행 흐름: 1) 렌더링 → 2) DOM 완성 → 3) useEffect 실행

1-2) 핵심 요약

- HTTP 요청은 서버에 데이터를 달라는 행위.
- useEffect는 렌더링 후 실행되는 후속 작업 공간.
- 렌더링과 네트워크 요청을 분리해야 화면이 부드럽다

1-3) 실무 팁

- 화면 진입 시점에 초기 데이터가 반드시 필요하다면 로딩 스켈레톤(placeholder UI)을 함께 설계
- SEO가 중요한 페이지는 SSR/SSG(Next.js) 등도 고려(클라이언트 패칭과 역할 분담).

```javascript
import { useEffect } from "react";
function App() {
  useEffect(() => {
    console.log("화면에 나타난 뒤 실행됩니다!");
  }, []);

  return <h1>안녕하세요!</h1>;
}
```

2. fetch와 axios — 비동기 요청 다루기

2-1) 정의

a) fetch

- 브라우저 내장, 추가 설치 불필요
- Promise 기반, 응답은 수동으로 .json() 변환

```javascript
fetch("https://fakestoreapi.com/products") // GET 요청 전송.
  .then((res) => res.json()) // 응답 본문을 JSON으로 파싱(비동기)
  .then((data) => console.log(data));
```

b) axios

- 설치 필요(npm install axios)
- JSON 자동 파싱, 짧은 코드, 편리한 에러 처리/취소/인터셉터

```javascript
import axios from "axios";

async function getProducts() {
  try {
    const res = await axios.get("https://fakestoreapi.com/products"); //  GET 요청 전송, 응답 JSON 자동 파싱
    console.log(res.data); // 서버 데이터 바로 접근
  } catch (error) {
    console.error(error);
  }
}
```

2-2) react안에서의 올바른 사용

a) 잘못된 예

- useEffect를 async로 만들지 말 것. 이유는 useEffect는 cleanup 함수를 기대하는데, async는 Promise를 반환 → React가 혼동.

```javascript
//
useEffect(async () => {
  /* ... */
}, []);
```

b) 올바른 예

- useEffect는 동기 함수로 유지. 내부에서 async function 정의/호출 → cleanup 기대와 충돌 없음.

```javascript
//  내부에 async 함수 정의
useEffect(() => {
  async function loadData() {
    const { data } = await axios.get("https://fakestoreapi.com/products");
    console.log(data);
  }
  loadData();
}, []);
코드;
```

2-3) 실무팁

- 공통 헤더/토큰/타임아웃이 필요하면 axios 인스턴스를 만들어 재사용.
- 요청 실패 시 재시도(backoff) 전략을 미리 설계

3. FakeStoreAPI 연동 실습 — 실제 데이터 가져오기

3-1) 예시

```javascript
import { useEffect, useState } from "react";

function Example() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await axios.get("https://fakestoreapi.com/products");
        setProducts(res.data);
      } catch (error) {
        setError("실패");
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);
  if (loading) return <p>로딩 중...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  return (
    <div>
      {products.map((p) => (
        <li>
          <img src={p.image} alt={p.title} width="50" /> {p.title} - ${p.price}
        </li>
      ))}
    </div>
  );
}

export default Example;
```

3-2) 실무팁

- 요청 방지: 동일한 URL을 짧은 시간 내 반복 호출 시 디바운스(입력 검색) 또는 캐시 도입.
- 상태 동결(freeze): 성공 후 데이터가 잠시 유지되길 원하면, 로딩 중에도 이전 데이터를 보여주고 별도 로딩 인디케이터만 업데이트(“stale-while-revalidate” 패턴)

4. 요청 취소와 에러 처리 고도화 — 안정적인 데이터 패칭을 위한 필수 패턴

4-1) 정의

- 사용자가 빠르게 화면을 이동하면 진행 중인 요청이 더는 필요 없을 수 있음. 이때 요청을 즉시 취소하지 않으면 메모리/네트워크 낭비 혹은 경고가 발생

| 개념                | 정의                                             | 역할                                    | 코드 예시                                  | 비유                            |
| ------------------- | ------------------------------------------------ | --------------------------------------- | ------------------------------------------ | ------------------------------- |
| **AbortController** | 브라우저가 제공하는 비동기 작업 취소용 내장 객체 | 요청 취소를 제어하는 컨트롤러 생성      | `new AbortController()`                    | 리모컨 본체                     |
| **controller**      | AbortController로 생성된 인스턴스                | 특정 요청을 취소하는 실제 제어 객체     | `const controller = new AbortController()` | 실제 리모컨                     |
| **signal**          | controller와 요청을 연결하는 객체                | 요청을 controller로 제어할 수 있게 연결 | `{ signal: controller.signal }`            | 리모컨과 기기를 연결하는 케이블 |
| **abort()**         | controller의 취소 메서드                         | 진행 중인 요청을 즉시 중단              | `controller.abort()`                       | 리모컨의 정지 버튼              |

4-2) 예시

```javascript
import { useEffect, useState } from "react";

function Example() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController(); //  리모컨(controller) 하나 생성
    async function fetchProducts() {
      try {
        const res = await axios.get("https://fakestoreapi.com/products", {
          signal: controller.signal, // 이 네트워크 요청을 방금 만든 리모컨으로 제어하겠다는 표시(케이블 연결)
        });
        setProducts(res.data);
      } catch (error) {
        //  취소에 의한 에러는 일반 오류와 구분해 사용자에게 노출하지 않거나 다르게 처리.
        if (axios.isCancel(error)) {
          setLoading(false);
          return;
        }
        setError("실패");
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();

    return () => {
      controller.abort(); //  컴포넌트가 사라질 때(또는 같은 effect가 다시 실행되기 전) 정지 버튼을 눌러 요청을 즉시 취소
    };
  }, []);
  if (loading) return <p>로딩 중...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  return (
    <div>
      {products.map((p) => (
        <li>
          <img src={p.image} alt={p.title} width="50" /> {p.title} - ${p.price}
        </li>
      ))}
    </div>
  );
}

export default Example;
```

4-3) 실무팁

- 타임아웃(axios timeout)을 설정해 무한 대기를 방지
- 실패 시 재시도: 500/네트워크 에러에 한해 지수 백오프(예: 300ms→600ms→1200ms)로 2~3회 재시도
- 에러를 원인별로 구분해 사용자 메시지 개선

5. 요청 취소와 에러 처리 고도화 — axios 인스턴스와 AbortController 실무 패턴

5-1) 정의

- 비슷한 설정을 반복한다면 axios 인스턴스로 공통화시켜 요청 취소·타임아웃·헤더·베이스 URL을 한 번에 관리

```javascript
export const apiClient = axios.create({
  baseURL: "https://fakestoreapi.com", // 모든 요청이 이 주소를 기본으로 사용
  timeout: 8000, // 8초가 지나면 자동으로 요청 중단
  headers: {
    "Content-Type": "application/json", // JSON 형식으로 주고받음
  },
});
```

5-2) 실무팁

- 페이징/정렬/필터를 URL 쿼리로 통일하고, 인스턴스 레벨에서 기본 파라미터 주입(예: ?locale=ko)

```javascript
export const apiClient = axios.create({
  baseURL: "https://fakestoreapi.com", // 모든 요청이 이 주소를 기본으로 사용
  timeout: 8000, // 8초가 지나면 자동으로 요청 중단
  headers: {
    "Content-Type": "application/json", // JSON 형식으로 주고받음
  },
  params: {
    locale: "ko", // 모든 요청 뒤에 자동으로 ?locale=ko 가 붙음
  },
});

// 실제 날아가는 주소: https://fakestoreapi.com/products?locale=ko
apiClient.get("/products");
```

6. 나만의 데이터 패칭 훅 만들기 — useFetch

```javascript
import { useEffect } from "react";

function useFetch(url) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    apiClient
      .get(url, { signal: controller.signal })
      .then((res) => {
        setData(res.data);
        setError(null);
      })
      .catch((error) => {
        if (error.name !== "CancelError" && error.code !== "ERR_CANCELED") {
          setError(error.message);
        }
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [url]);

  return { data, error, loading };
}

export default useFetch;
```

7. 추가 실무 예제 코드

a) debounce(디바운스)

```javascript
function useDebouncedValue(value, delay = 300) {
  const [v, setV] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setV(value), delay);
    return () => {
      clearTimeout(t);
    };
  }, [value, delay]);
}

function SearchBox() {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);
  const debouncedKeyword = useDebouncedValue(keyword, 400);

  useEffect(() => {
    if (!debouncedKeyword) return;
    const controller = new AbortController();
    apiClient
      .get(`/search?q=${encodeURIComponent(debouncedKeyword)}`, {
        signal: controller.signal,
      })
      .then((res) => {
        setResults(res.data);
      })
      .catch((error) => {
        if (error.code !== "ERR_CANCELED" && error.name !== "CanceledError") {
          console.error(err);
        }
      });

    return () => controller.abort();
  }, [debouncedKeyword]);

  return (
    <div>
      <input
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="검색어"
      />
      <ul>
        {results.map((i) => (
          <li key={i.id}>{i.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default SearchBox;
```

b) 지수 백오프 재시도(간단 구현)

```javascript
async function fetchWithBackOff(fn, { retries = 3, base = 300 } = {}) {
  let attempt = 0;
  while (true) {
    try {
      return await fn();
    } catch (e) {
      if (attempt >= retries) throw e;
      const wait = base * 2 ** attempt;
      await new Promise((r) => setTimeout(r, wait));
      attempt++;
    }
  }
}

await fetchWithBackOff(() =>
  apiClient.get(`/search?q=${encodeURIComponent(debouncedKeyword)}`, {
    signal: controller.signal,
  }),
);
```

c) SWR 패턴 (이전 데이터 유지 & 최산화)

- SWR(“Stale-While-Revalidate”): “먼저 오래된(캐시) 데이터를 즉시 보여주고, 백그라운드에서 최신 데이터로 갱신” → 초기 응답성↑, 사용자 체감 속도↑.

```md
data === null → “처음” 경로: 로딩 UI 후 최초 fetch → setData.
data가 이미 있음 → “SWR 경로”:
setStale(true)로 이전 데이터 즉시 노출 + “새로고침 중…” 표시
새 fetch 완료 시 데이터 교체 + setStale(false)
```

8. axios 에러 코드 정리

| 코드명           | 의미               | 발생 상황                         |
| ---------------- | ------------------ | --------------------------------- |
| ERR_NETWORK      | 네트워크 연결 불가 | 인터넷 단절, 서버 다운, CORS 위반 |
| ECONNABORTED     | 연결 중단          | 설정한 timeout 초과               |
| ERR_CANCELED     | 요청 취소          | AbortController 등으로 요청 취소  |
| ERR_BAD_REQUEST  | 잘못된 요청        | 서버가 4xx 응답 반환              |
| ERR_BAD_RESPONSE | 잘못된 응답        | 서버가 5xx 응답 반환              |

9. error.response 유무에 따른 상황

a) error.response가 없는 경우 (서버 응답 없음)
| 구분 | 설명 |
| --------- | ----------------------------------- |
| 상태 | 서버까지 요청이 도달하지 못함 |
| 특징 | response는 undefined, request만 존재 가능 |
| 네트워크 오프라인 | 인터넷 연결 끊김 |
| 서버 다운 | 서버가 꺼져 있음 |
| CORS 에러 | 브라우저가 응답 차단 |
| 타임아웃 | 서버 응답이 너무 느림 |
| 요청 취소 | AbortController로 요청 중단 |

b) error.response가 있는 경우 (서버 응답 있음)
| 항목 | 설명 |
| ------- | ---------------------------- |
| 상태 | 서버까지 요청이 정상 도착 |
| 의미 | 서버가 에러라도 응답을 반환 |
| data | 서버가 보낸 에러 메시지 |
| status | HTTP 상태 코드 (400, 500 등) |
| headers | 응답 헤더 정보 |
