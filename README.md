### section 4. 개발 환경 세팅과 이벤트 다루기

미션을 통해 알게 된점

## 1. e.target.value의 속성의 사용

- e.target.value 속성은 사용자가 데이터를 입력하거나 선택하는 form 요소 태그에 있다. 가장 대표적인 태그는 input, textarea, select, button, option

- form 요소 태그가 아닌 태그에서 value를 가져오고 싶다면은

````md
1. 인자로 넘기기

```javascript

   onClick={(event) => handleClick(fruit, index, event)}
```

2. data-\*속성 사용
   e.currentTarget: 이벤트가 달린 요소
   e.target: 실제 클릭된 요소

```javascript
<li
  key={index}
  data-fruit={fruit}
  onClick={(e) => {
    const value = e.currentTarget.dataset.fruit;
    console.log(value);
  }}
>
```
````

## 2. 엔터 이벤트가 2번 발생하는 현상

이유는 대부분 한글입력(IME, 조합입력) 때문이다.
한글을 입력할 때는 내부적으로 아래와 같은 흐름이 실행이 된다.

```md
1. onCompositionStart → 조합 시작 (예: ㅎ + ㅏ)
2. onKeyDown (Enter)
3. onCompositionEnd → 글자 확정
4. onKeyDown (Enter) 한 번 더 실행되는 경우가 있음

즉, 한글 입력 상태에서 Enter를 누르면:
조합을 끝내기 위한 Enter
실제 Enter 입력
```

어떻게 해결할까?

1. input 속성의 onCompositionStart, onCompositionEnd 속성을 추가하여 state 로 관리한다.

```javascript
const [isComposing, setIsComposing] = useState(false);

<input
  value={addItem}
  onKeyDown={handleKeyDown}
  onChange={(e) => {
    setAddItem(e.target.value);
  }}
  onCompositionStart={() => setIsComposing(true)}
  onCompositionEnd={() => setIsComposing(false)}
/>;
```

2. React 에서는 KeyboardEvent 안에 이미 nativeEvent.isComposing속성이 있다.

```javascript
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.nativeEvent.isComposing) {
      setFruitsList((prev) => {
        return [...prev, addItem];
      });
      setAddItem("");
    }
  };

```

## 3. 여러 이벤트

1.  onKeydown, onKeyup (키보드 이벤트)

```md
a) onKeydown

- 키를 눌렀을때 발생하는 이벤트

b) onKeyup

- 눌렀던 키를 뗐을 때 발생하는 이벤트
```

2.  onSubmit (폼 이벤트)

````md
- 사용자가 폼을 제출할 때 발생하는 이벤트
- 사용자가 form을 제출하는 방법은 크게 2가지이다.
  a) form 태그의 onSummit 이벤트

  b) 인풋 태그 혹은 버튼 태그를 만들어서 사용하는 방법 (type="submit")

- form의 onSubmit

```javascript
  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("submit 폼 제출");
  };

  return (
    <form style={{ border: "3px solid blue" }} onSubmit={handleSubmit}>
      <input
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
  )

```

```javascript
<input
  type="submit"
  onClick={(e) => {
    e.preventDefault();
    alert("폼 제출");
  }}
/>

<button
    type="submit"
    onClick={(e) => {
      e.preventDefault();
      alert("폼 제출");
    }}
  >
    폼 제출
  </button>
```
````

````

3.  onMouseEnter, onMouseLeave,onContextMenu (마우스 이벤트)

```md
a) onMouseEnter

- 마우스 커서가 요소 안으로 들어올 때 발생
  ex) 툴팁 표시, hover 효과

b) onMouseLeave

- 마우스 커서가 요소 밖으로 나갈 때 발생
  ex) 툴팁 숨김, hover 해제

c) onContextMenu

- 마우스 오른쪽 버튼 클릭 시 발생
- e.preventDefault() 를 하면은 기본 브라우저 기능(복사', '붙여넣기', '검사(개발자 도구)' 등이 포함된 브라우저 컨텍스트 메뉴를 호출하는 기능)를 막는다.
````
