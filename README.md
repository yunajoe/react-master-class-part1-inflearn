## 주제: 스타일링 전략과 UI 라이브러리 활용 (Styling Strategies & UI Libraries)

1. 관심사의 분리 (Separation of Concerns)

1-1) 정의

- 관심사의 분리(Separation of Concerns) 는 “서로 다른 역할은 뒤섞지 말고, 나누어 관리하자”는 오래된 원칙
- 전통 웹: HTML(구조) / CSS(디자인) / JS(동작) 가 명확히 분리되었습니다.
- React 컴포넌트 시대: JSX(구조)+상태/이벤트(로직)+스타일 이 한 파일에 공존
- SoC의 목적은 유지보수성/협업성/일관성 향상

1-2) 전략

- 작은 앱: 한 파일에 구조·로직·스타일을 함께 둬도 관리 가능.
- 큰 앱/다인 협업: 토큰·로직·표현을 단계적으로 분리하면 유지보수 유리.
- 균형 전략(예):
  디자인 토큰(색·여백 등)은 theme.js에 모으기
  데이터/이벤트 로직은 커스텀 훅으로 분리
  컴포넌트에는 JSX 구조 + props 기반 조건부 스타일만 남기기

1-3) 3단 분리 전략

- 실무에서 가장 권장되는 토큰-로직-뷰 분리 모델
  | 레이어 | 담당 역할 (Responsibility) | 관리 항목 (Artifacts) | 기대 효과 (Benefits) |
  | -------------- | ---------------------- | --------------------------- | ---------------------- |
  | Design Tokens | 브랜드 규격 정의 | theme.js, 색상/여백/폰트 객체 | 하드코딩 방지, 디자인 일관성 유지 |
  | Business Logic | 데이터 및 상태 제어 | Custom Hooks, API 호출, 상태 관리 | 로직 재사용성 향상, 테스트 용이성 |
  | View | UI 구조 및 표현 | JSX, Props 기반 조건부 스타일 | 코드 가독성 증대, 빠른 UI 수정 가능 |

```javascript
// theme.js — 디자인 토큰 집중 관리
export const theme = {
  colors: { primary: "#007BFF", danger: "#E74C3C", text: "#212529" },
  spacing: { sm: "8px", md: "12px", lg: "16px" },
  radius: { md: "8px" },
};
```

```javascript
import { useState } from "react";
export function useSubmit() {
  const [pending, setPending] = useState(false);
  const submit = async (fn) => {
    setPending(true);
    try {
      await fn();
    } finally {
      setPending(false);
    }
  };
  return { pending, submit };
}
```

```javascript
// Button.jsx — 표현(뷰) 담당
import styled, { ThemeProvider } from "styled-components";
import { theme } from "./theme";
import { useSubmit } from "./useSubmit";

const Btn = styled.button`
  background: ${({ theme, variant }) =>
    variant === "danger" ? theme.colors.danger : theme.colors.primary};
  color: #fff;
  border: 0;
  border-radius: ${({ theme }) => theme.radius.md};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
`;

export default function Button({ variant = "primary", onClick, children }) {
  const { pending, submit } = useSubmit();
  return (
    <ThemeProvider theme={theme}>
      <Btn variant={variant} disabled={pending} onClick={() => submit(onClick)}>
        {pending ? "처리 중..." : children}
      </Btn>
    </ThemeProvider>
  );
}
```

2. 스타일링 방식 비교 — Vanilla CSS, CSS Modules, CSS-in-JS

2-1) 정의

- Vanilla CSS
  장점: 단순, 러닝커브 낮음, 빌드 의존 적음
  단점: 전역 네임스페이스로 충돌/덮어쓰기 추적 어려움

```css
/* Vanilla CSS */
.button {
  background: green;
  color: #fff;
}
```

- CSS Modules
  장점: .module.css → 클래스 자동 고유화(해시)로 충돌 차단, 전통 CSS 그대로
  단점: 파일 분리 유지 필요, 동적 스타일링은 클래스 토글 위주

```javascript
// CSS Modules
import styles from "./Button.module.css";
<button className={styles.button}>클릭</button>;
```

- CSS-in-JS (styled-components/Emotion)
  장점: 한 파일 내 응집도, props/state 기반 동적 스타일 탁월, 클래스 자동 고유화
  단점: 코드/스타일 혼재로 가독성 이슈, 런타임 주입에 따른 성능 주의

```javascript
// CSS-in-JS
import styled from "styled-components";
const Button = styled.button`
  background: ${({ primary }) => (primary ? "royalblue" : "gray")};
  color: #fff;
`;
```

3. Inline Styles — 가장 직접적인 스타일링 방법

3-1) 정의

- Inline Styles는 JSX style 속성에 JS 객체를 넣는 가장 즉각적인 방식
- 빠른 실험·국소 수정에 유리하지만, 범용 스타일링 주력으로는 한계

```javascript
export default function Welcome() {
  const titleStyle = {
    color: "royalblue",
    fontSize: "24px",
    fontWeight: "bold",
    padding: "10px",
  };

  return <h1 style={titleStyle}>안녕하세요, React!</h1>;
}
```

| 방식                                       | 핵심 특징                          | 장점                                                 | 단점                                       | 추천 상황                     |
| ------------------------------------------ | ---------------------------------- | ---------------------------------------------------- | ------------------------------------------ | ----------------------------- |
| **Vanilla CSS**                            | 전통적인 CSS 파일 사용             | 단순함, 러닝커브 낮음, 빌드 의존 적음                | 전역 네임스페이스로 클래스 충돌 가능       | 소규모 프로젝트, 프로토타입   |
| **CSS Modules**                            | `.module.css` → 클래스 자동 해시화 | 충돌 방지, 기존 CSS 문법 유지                        | 파일 분리 관리 필요                        | 중대형 협업 프로젝트          |
| **CSS-in-JS** (styled-components, Emotion) | JS 안에서 스타일 정의              | props/state 기반 동적 스타일링, 컴포넌트 응집도 높음 | 런타임 스타일 생성으로 성능 고려 필요      | 인터랙션 많은 앱, 테마 시스템 |
| **Inline Styles**                          | JSX `style={{}}` 객체 스타일       | 가장 직관적, 빠른 테스트                             | 의사 클래스(:hover 등) 불가, 재사용성 낮음 | 국소적 스타일, 빠른 실험      |

4. Popular UI Libraries — Tailwind, Material UI, Ant Design

4-1) 정의

- 실무에선 바퀴를 다시 만들지 않기 위해 UI 라이브러리를 적극 활용
- 버튼/카드/모달/폼 등 표준 컴포넌트를 빠르게 조립하고, 접근성과 일관성을 확보

4-2) 종류

- Tailwind CSS: Utility-First. 짧은 클래스 조합으로 빠르게 스타일 구성. 최신 트렌드.
- MUI(Material UI): 구글 Material Design 구현. 접근성/반응형/테마 강력. 대규모 서비스 적합.
- Ant Design: 데이터 중심 엔터프라이즈 UI에 강점(표, 폼, 대시보드). 내부 시스템·관리도구에 적합.
- shadcn/ui: Tailwind 기반 고품질 컴포넌트 세트(유틸리티+컴포넌트 하이브리드).

| 라이브러리            | 스타일링 철학        | 특징                              | 장점                          | 추천 사용                           |
| --------------------- | -------------------- | --------------------------------- | ----------------------------- | ----------------------------------- |
| **Tailwind CSS**      | Utility-First        | 짧은 클래스 조합으로 스타일 구성  | 매우 빠른 개발, 디자인 일관성 | 스타트업, 빠른 UI 개발              |
| **Material UI (MUI)** | Material Design 기반 | 완성도 높은 React 컴포넌트 세트   | 접근성, 테마 시스템 강력      | 대규모 서비스                       |
| **Ant Design**        | Enterprise UI        | 데이터 중심 UI (Table, Form 강력) | 관리자/대시보드 구축에 유리   | 기업 내부 시스템                    |
| **shadcn/ui**         | Tailwind + Headless  | 코드 복사 기반 컴포넌트           | 커스터마이징 자유도 높음      | 디자인 커스터마이징 필요한 프로젝트 |

5. 아이콘 활용하기 — React 프로젝트에서 가장 많이 쓰이는 시각 요소

5-1) 정의

- 아이콘은 의미를 즉시 전달하고 공간 효율을 높입니다. (삭제=휴지통, 검색=돋보기)
- 실무에서는 보통 React Icons 같은 라이브러리를 사용합니다.

```javascript
// 기본 사용
import { FaHeart } from "react-icons/fa";
export default function App() {
  return (
    <button>
      <FaHeart /> 좋아요
    </button>
  );
}
```

```javascript
// 좋아요 토글 (인라인 스타일로 동적 색상)
import { useState } from "react";
import { FaHeart } from "react-icons/fa";

export default function LikeButton() {
  const [liked, setLiked] = useState(false);
  const baseStyle = {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "20px",
  };
  const dynamicStyle = { color: liked ? "crimson" : "gray" };

  return (
    <button
      onClick={() => setLiked((v) => !v)}
      style={{ ...baseStyle, ...dynamicStyle }}
    >
      <FaHeart /> {liked ? "좋아요 취소" : "좋아요"}
    </button>
  );
}
```
