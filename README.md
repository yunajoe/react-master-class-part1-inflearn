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
