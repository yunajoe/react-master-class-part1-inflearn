## 미션을 통해 알게 된 점

1. aria-invalid 속성

- 폼 입력 필드의 값이 유효하지 않은지(오류가 있는지)를 보조 기술(스크린 리더 등)에 알리는 데 사용

- 주요 특징 및 사용법
  a) false (기본값): 값이 유효함.
  b) true: 값이 유효하지 않음 (오류 발생).
  c) grammar: 문법 오류.
  d) spelling: 철자 오류.
  적용: 주로 <input>, <select>, <textarea> 등 사용자 입력 필드에 적용됩니다.
  목적: 스크린 리더 사용자가 폼 검증 오류를 즉시 인지할 수 있도록 하여 웹 접근성을 향상시킵니다.

2. aria-describedby 속성

- 웹 접근성을 위해 UI 요소(input, button 등)에 상세한 설명 문구를 연결하는 WAI-ARIA 속성
- 주요 특징 및 사용법
  a) 역할: 주로 폼 입력란의 도움말, 에러 메시지, 버튼의 상세 기능 설명 등을 제공할 때 사용
  b) 구현 방법: aria-describedby="ID\_값"을 사용하여 설명이 포함된 태그의 id를 연결

```html
<label for="password">비밀번호</label>
<input type="password" id="password" aria-describedby="pw-help" />
<span id="pw-help">영문, 숫자, 특수문자를 포함하여 8자 이상</span>
```

3. aria-live 속성

- 웹 페이지에서 동적으로 업데이트되는 콘텐츠(알림, 채팅, 에러 메시지 등)를 스크린 리더 사용자가 페이지 위치와 관계없이 즉시 인지할 수 있도록 알리는 WAI-ARIA 속성
- 중요도에 따라 polite(일반), assertive(즉시), off(비활성) 값을 사용하며, 주로 aria-live="polite"가 권장
  a) polite (권장): 스크린 리더가 현재 읽고 있는 내용을 마친 후, 업데이트 내용을 알립니다. 중요하지만 긴급하지 않은 정보(예: 채팅 메시지, 검색 결과 수)에 적합

  b) assertive: 스크린 리더가 즉시 하던 일을 멈추고 업데이트 내용을 알립니다. 사용자 작업에 방해가 되는 중요/긴급 정보(예: 시스템 오류 메시지, 제한 시간 알림)에 사용

  c) off (기본값): 업데이트 내용을 알리지 않습니다

```html
<!-- 3초 뒤 메시지가 나타나면 스크린 리더가 읽어줌 -->
<div aria-live="polite">채팅 메시지: 안녕하세요!</div>
```
