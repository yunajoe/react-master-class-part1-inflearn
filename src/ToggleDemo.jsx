// 상태(state)에 따라 토글되는 버튼
import { useState } from "react";
import styled from "styled-components";

const Toggle = styled.button`
  background: ${({ active }) => (active ? "seagreen" : "gray")};
  color: white;
  border-radius: 6px;
`;
function ToggleDemo() {
  const [on, setOn] = useState(false);
  return (
    <Toggle active={on} onClick={() => setOn((v) => !v)}>
      {on ? "ON" : "OFF"}
    </Toggle>
  );
}

export default ToggleDemo;
