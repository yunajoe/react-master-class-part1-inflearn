### section 4. 개발 환경 세팅과 이벤트 다루기

미션을 통해 알게 된점

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
