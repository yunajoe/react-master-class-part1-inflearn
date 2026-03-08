# Section 8. useEffect 완전 정복 – React의 비동기 세계

## 미션을 통해 알게 된점

1. 의존성 배열별 특징

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
