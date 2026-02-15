### section 3. 컴퍼넌트와 데이터 흐름의 기본

## 1.리액트 컴포넌트 입문 — UI를 이루는 최소 단위

1. 컴포넌트란 무엇인가 (정의·배경·핵심 규칙)

정의

- 컴포넌트(Component)는 UI를 이루는 최소 단위
- React에서는 “자바스크립트 함수가 JSX(= UI 설계도)를 반환”하면 그것이 곧 컴포넌트

핵심 규칙

- 대문자 이름: 사용자 정의 컴포넌트는 반드시 대문자로 시작
- <div> 같은 소문자는 브라우저 태그(문자열) 로, <Hello> 같은 대문자는 현재 스코프의 식별자(함수/컴포넌트 참조) 로 인식

2. 가장 기본 컴포넌트 (예제·동작 원리)

```javascript
function Hello() {
  return <h1>Hello, React!</h1>;
}

// 2) 사용
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Hello />);
```

```md
라인별 동작 해설

1. function Hello() { ... }
   대문자 Hello 이름의 함수형 컴포넌트 정의. React는 대문자 시작 식별자를 사용자 정의 컴포넌트로 인식합니다.
2. return <h1>Hello, React!</h1>;
   JSX(사람 친화 표기)를 반환합니다. 이 JSX는 Babel에 의해 React.createElement("h1", null, "Hello, React!") 형태로 변환되고, React Element(값 객체)로 메모리에 만들어집니다.
3. const root = ReactDOM.createRoot(document.getElementById('root'));
   id가 root인 DOM 요소를 React 관리 루트로 초기화합니다(React 18+ API). 이제 이 컨테이너의 생명주기·패치는 React가 담당합니다.
4. root.render(<Hello />);
   <Hello />를 컴포넌트로 호출하고, 반환된 React Element 트리를 VDOM diff → 실제 DOM으로 반영합니다.
   <Hello />는 내부적으로 React.createElement(Hello, null)로 변환됩니다.
```

```md
[JSX] [Babel 변환] [ReactDOM]
<Hello /> ───► React.createElement(Hello, null) ───► (VDOM diff) ─► (DOM 패치)
▲ │
└─ 대문자: 사용자 정의 컴포넌트 ─┘
```

3. 대문자/소문자와 Babel 변환 (내부 메커니즘)

```md
<div /> → React.createElement("div", ...) (문자열 태그)
<Hello /> → React.createElement(Hello, ...) (식별자 참조)
소문자 태그      : "div" | "span" | "button"  → 문자열로 해석(브라우저 요소)
대문자 컴포넌트  : Hello | MyCard | Header    → 현재 스코프의 식별자(함수/클래스)
의미: 소문자는 “DOM 요소 타입 문자열”, 대문자는 “코드 상의 함수 참조”로 바뀝니다. 컴포넌트가 파일에 없거나 import 안 되었으면 식별자를 못 찾아 에러가 납니다.
```

4. 하나의 루트와 Fragment (불필요한 div 방지)

```javascript
function Card() {
  return (
    <>
      <h2>제목</h2>
      <p>설명 내용</p>
    </>
  );
}
```

```md
라인별 동작 해설
function Card() { ... }
Card 컴포넌트 정의.
return ( <></> );
Fragment(짧은 문법)로 최상위 하나의 루트를 제공합니다. DOM에 추가 노드를 만들지 않고 자식만 묶는 래퍼입니다.

<h2>제목</h2> / <p>설명 내용</p>
두 형제 노드를 Fragment로 감싸 하나의 서브트리로 반환합니다. React는 이 서브트리를 한 단위로 diff/교체합니다.

Card()
└─ Fragment <>
├─ <h2>제목</h2>
└─ <p>설명 내용</p>
(최상위 하나의 루트 OK, 불필요한 <div> 추가 없음)

짧은 Fragment(<></>)는 key를 붙일 수 없고, 리스트에서 key가 필요하면
<React.Fragment key={...}>...</React.Fragment>긴 문법을 사용합니다.
```

5. 컴포지션(합성) — 작은 조각으로 큰 UI 만들기

```javascript
function Title() {
  return <h1>Welcome</h1>;
}
function Emoji() {
  return (
    <div className="emoji" aria-label="dev">
      🧑‍💻
    </div>
  );
}
function Header() {
  return (
    <header className="header">
      <Emoji />
      <Title />
    </header>
  );
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Header />);
```

```md
라인별 동작 해설

1. Title / Emoji
   각각 역할이 분리된 작은 컴포넌트입니다. 재사용·테스트 유리.
2. function Header() { return ( ... ); }
   상위 Header가 하위 컴포넌트들을 배치하여 상위 UI 구조를 만듭니다(합성).
3. <Emoji /> / <Title />
   JSX에서 사용자 정의 컴포넌트 호출. 반환된 React Element가 부모 트리에 자식 노드로 들어갑니다.
4. ReactDOM.createRoot(...); root.render(<Header />);
   Header 전체 서브트리를 초기 마운트합니다. 하위 요소는 타입이 유지되면 재사용, 텍스트/props만 패치됩니다
```

6. 자주 하는 오해와 교정
   오해: “컴포넌트 = 파일 1개”
   교정: 파일 수가 아니라 역할 단위가 기준입니다(한 파일에 여러 컴포넌트도 OK).
   오해: “루트가 둘이어도 상관없다”
   교정: React의 비교·교체 단위가 흐려져 성능·정확성에 불리 → 항상 하나.

7) 용어 미니 글로서리
   컴포넌트: JSX를 반환하는 함수(또는 클래스).
   Fragment: DOM에 안 찍히는 래퍼.
   React Element: JSX가 변환된 값 객체(설계도).
   createRoot/render: 설계도를 실제 DOM에 반영.

## 2.React Props — 함수 인자처럼 전달되는 컴포넌트의 외부 데이터

## 3.단방향 데이터 흐름과 children, key

## 4.React에서 map과 filter 활용하기 — 리스트를 효율적으로 렌더링
