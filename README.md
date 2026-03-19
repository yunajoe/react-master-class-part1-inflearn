## 주제: useEffect 완전 정복 – React의 비동기 세계

1.  useEffect 완전 기초 — 화면 밖과 대화하는 React의 방식

1-1) “렌더링만으로는 할 수 없는 일”을 DOM 업데이트 직후에 수행하는 후속 작업

- 서버 데이터 요청(fetch), 이벤트 리스너 등록/해제(add/removeEventListener), 타이머(setInterval/Timeout), 문서 타이틀 변경(document.title), 외부 위젯(지도/차트) 초기화

1-2) 실행 시점: 렌더(가상 UI 계산) → 커밋(실제 DOM 반영) → useEffect 실행

- window.onload처럼 모든 리소스를 기다리지 않고, 화면에 DOM이 반영된 직후 실행됩니다. 따라서 “화면에 보이는 결과가 먼저 안정적으로 만들어진 다음”에 외부 세계와 통신·연결하는 흐름

1-3) 구성요소

- Effect 본문: 실행할 동작, Cleanup: 같은 effect가 다시 실행되기 전 또는 언마운트 시 호출되는 정리 함수, 의존성 배열: “언제 다시 실행할지”를 결정(없음/빈배열/특정값)

1-4) 예시

```javascript
// 매 렌더 직후 실행
useEffect(() => {
  // 컴포넌트가 최초 렌더링된 뒤 DOM 업데이트가 끝난 직후 실행될 코드
});
```

- 의존성 배열을 생략하면 매 렌더 직후 실행. 이 기본형은 단독으로 쓰기보다는, 다음에 설명할 의존성 배열과 함께 “실행 타이밍을 좁히는” 용도로 확장해 사용하는 것이 일반

```javascript
useEffect(() => {
  // 실행할 코드(이벤트 등록/타이머 시작 등)

  return () => {
    // 정리(cleanup): 이벤트 해제/타이머 정리 등
  };
});
```

- effect가 다시 실행되기 직전 혹은 컴포넌트가 사라지기 직전”에 호출
- 예를 들어 이전에 등록한 이벤트 리스너를 해제하지 않으면 중복 등록으로 같은 콜백이 여러 번 호출되거나, 메모리 누수가 발생

```javascript
useEffect(() => {}, [값1, 값2]);
```

- 값1과 값2을 변경할때 useEffect 다시 실행

1-5) 요약

| 의존성 배열 형태  | 실행 시점         | 특징                                                        |
| ----------------- | ----------------- | ----------------------------------------------------------- |
| 없음              | 매 렌더 후 실행   | 변화가 감지될 때마다 항상 실행 (가장 빈번)                  |
| 빈 배열 (`[]`)    | 마운트 시 1회     | 처음 등장할 때만 실행 + 언마운트 시 cleanup 1회             |
| 특정값 (`[deps]`) | deps 변경 시 실행 | 마운트 1회 + deps 변경 시마다 실행 (cleanup → 새 effect 순) |

2.  useEffect 케이스 1 — 두 번째 인자 없음: “모든 렌더링 직후 실행”

```javascript
import { useEffect, useState } from "react";

function TEST() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      console.log("타이머 동작 중");
    }, 1000);

    return () => {
      clearInterval(id); // 다음 effect 실행 전/언마운트 시 정리
    };
  }); // 배열 없음

  return (
    <div>
      <p>현재 카운트: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  );
}

export default TEST;
```

3.  useEffect 케이스 2 — 의존성 []: “마운트 직후 1회 + 언마운트 시”

```javascript
import { useEffect } from "react";

function Modal({ onClose }) {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    console.log("ESC 이벤트 등록됨");

    return () => {
      window.removeEventListener("keydown", handleEsc);
      console.log("ESC 이벤트 제거됨");
    };
  }, []); // 최초 1회 등록, unmount 때 해제

  return (
    <div className="modal">
      <h2>모달 창</h2>
      <p>ESC 키를 누르면 닫힙니다.</p>
    </div>
  );
}

export default Modal;
```

4.  useEffect 케이스 3 — 특정 값이 변할 때마다 실행하기

```javascript
import { useState, useEffect } from "react";

function SearchBox() {
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    if (keyword !== "") {
      console.log(`"${keyword}" 로 검색을 실행합니다.`);
      // fetch(`/api/search?q=${encodeURIComponent(keyword)}`) ...
    }
  }, [keyword]); // keyword 바뀔 때만

  return (
    <input
      value={keyword}
      placeholder="검색어를 입력하세요"
      onChange={(e) => setKeyword(e.target.value)}
    />
  );
}
```

```javascript
import { useState, useEffect } from "react";

function FilteredList() {
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("recent");

  useEffect(() => {
    console.log("리스트 갱신:", { keyword, category, sort });
    // fetch(`/api/items?kw=${kw}&cat=${category}&sort=${sort}`)
    //  .then(...) ...
    return () => {
      console.log("이전 작업 정리(요청 취소/타이머 해제 등)");
    };
  }, [keyword, category, sort]);

  return (
    <section>
      <input value={keyword} onChange={(e) => setKeyword(e.target.value)} />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="all">전체</option>
        <option value="book">도서</option>
        <option value="movie">영화</option>
      </select>
      <select value={sort} onChange={(e) => setSort(e.target.value)}>
        <option value="recent">최신순</option>
        <option value="popular">인기순</option>
      </select>
    </section>
  );
}
```

5.  useEffect 의존성 배열 케이스 완전 정복 — 실무 패턴 & 함정 지도

| 형태     | 실행 시점                     | 용도                 |
| -------- | ----------------------------- | -------------------- |
| 없음     | 모든 렌더마다 실행            | 디버깅(로그)         |
| `[]`     | 마운트 1회 + 언마운트 cleanup | 초기화 / 이벤트 등록 |
| `[deps]` | deps 변경 시 재실행           | 일반적인 데이터 흐름 |

a) 패턴 1: 렌더 디버깅

```javascript
useEffect(() => {
  console.log("렌더마다 실행");
});
```

b) 패턴 2: 1회 등록 + cleanup

```javascript
useEffect(() => {
  const handler = () => {};
  window.addEventListener("keydown", handler);
  return () => window.removeEventListener("keydown", handler);
}, []);
```

c) 패턴 3: 상태 변화 + 요청 취소

```javascript
useEffect(() => {
  const controller = new AbortController();

  fetch(url, { signal: controller.signal });

  return () => controller.abort();
}, [deps]);
```

6.  의존성 배열별 특징

| 의존성 배열    | effect 실행           | cleanup 실행                                |
| -------------- | --------------------- | ------------------------------------------- |
| `[]` (빈 배열) | 마운트 시 1회         | 언마운트 시 1회                             |
| `[deps]`       | 마운트 + deps 변경 시 | deps 변경 시 이전 effect의 cleanup 실행     |
| 생략           | 매 렌더링 시          | 다음 렌더링 전에 이전 effect의 cleanup 실행 |

2. abortController

3. 자주 겪는 함정 & 해결 요약
   a) 오래된 값 (Stale Closure)
   - 원인: effect 내부에서 참조하는 값이 deps 배열에 누락되어, 처음 클로저의 값만 사용됨

   ```javascript
   function Counter() {
     const [count, setCount] = useState(0);

     useEffect(() => {
       const id = setInterval(() => {
         console.log("현재 count:", count); // 항상 처음 값 0 출력 → stale closure
       }, 1000);
       return () => clearInterval(id);
     }, []); // count를 deps에 넣지 않음

     return <button onClick={() => setCount(count + 1)}>증가</button>;
   }
   ```

   b) 무한 루프
   - 원인: effect에서 상태를 갱신(setState)하면서, 그 상태를 그대로 deps에 넣어 반복 실행됨

   ```javascript
   function InfiniteLoop() {
     const [count, setCount] = useState(0);

     useEffect(() => {
       setCount(count + 1); // 매 렌더마다 증가 → 무한 루프
     }, [count]); // count가 deps에 있음 → 계속 재실행
   }
   ```

c) 이벤트/타이머 중복

- 원인: cleanup 함수 누락 또는 deps 설계 오류로 이벤트/타이머가 중복 등록됨

  ```javascript
  function ScrollLogger() {
    useEffect(() => {
      const handleScroll = () => console.log(window.scrollY);
      window.addEventListener("scroll", handleScroll);
      // cleanup 누락 → 이벤트 중복 등록 가능
    }, []);
  }
  ```

d) 디바운스 누락으로 과도한 요청

- 원인: 입력값 변화를 그대로 deps에 사용하여, 변화가 있을 때마다 불필요하게 요청이 발생

  ```javascript
  function Search() {
    const [keyword, setKeyword] = useState("");

    useEffect(() => {
      fetch(`/search?q=${keyword}`); // 입력 변화마다 호출 → 과도한 요청
    }, [keyword]);
  }
  ```
