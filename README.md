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
