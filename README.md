# section5. state의 이해와 활용

## 미션을 통해 알게 된 점

## 1. controlledInput과 uncontrolledInput

- controlledInput은 react의 state로 값을 관리하는 방법. 즉, value와 onChange로 값을 관리한다. 이는 React가 값을 관리할 수 있다.

```javascript
<input value={name} onChange={(e) => setName(e.target.value)} />
```

- uncontrolledInput은 DOM이 입력값을 관리하는 방법. useRef()는 돔에 직접 접근할 수 있게 해 주는 통로.
- 물리적 상태가 필요할 시(input에 focus, 스크롤 위치, 높이 측정하기) uncontrolled 방법을 사용해야 한다. 왜냐하면은 state는 데이터를 관리하여 그리는 부분 전 필요한 것이고 focus/스크롤/크기 측정은 이미 그려진 화면을 조작하거나 읽는것이기 때문이다.

```javascript
const inputRef = useRef();
<input ref={inputRef} />;
```

## 2. Functional Update 패턴

- Functional Update 패턴은 React에서 setState(또는 useState의 setter)를 호출할 때 이전 상태값을 인자로 받는 함수 형태로 새로운 상태를 계산하는 방식

a) 일반 방식은 “값”을 저장함

- 현재 count = 0, setCount(1) 예약, setCount(1)
- React는 결국 1을 두번 넣으라는 요청을 받는것과 같다.
- 값은 계산 시점이 "지금" 이다.

```javascript
setCount(count + 1);
setCount(count + 1);
```

b)Functional Update는 “함수”를 저장함

- "prev => prev + 1" 함수, "prev => prev + 1" 함수 를 저장한다. 즉 계산법을 저장
- 함수는 지금 계산을 하지 않고, React가 업데이트를 처리할 때 한다.

```javascript
setCount((prev) => prev + 1);
setCount((prev) => prev + 1);
```

3. dataset 속성

- e.currentTarget 는 이벤트가 등록된 요소, e.target은 이벤트가 실행되는 요소
- EventTarget 타입에는 dataset 프로퍼티가 정의되어 있지 않고, e.currentTarget는 dataset 프로퍼티가 정의되어 있다.

| 프로퍼티          | 타입                        | dataset 접근 가능 여부 |
| ----------------- | --------------------------- | ---------------------- |
| `e.currentTarget` | `HTMLButtonElement` 등      | O (안전하게 접근 가능) |
| `e.target`        | `EventTarget` (불특정 타입) | X (타입 단언 필요)     |
