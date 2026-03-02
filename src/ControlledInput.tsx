import { SubmitEvent, useState } from "react";

function ControlledInput() {
  const [nameValue, setNameValue] = useState("");
  const handleClick = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(`현재 입력값: ${nameValue}`);
  };
  return (
    <form onSubmit={handleClick}>
      <input
        value={nameValue}
        onChange={(e) => {
          setNameValue(e.target.value);
        }}
      />
      <p>현재 입력값:{nameValue}</p>
      <button type="submit">제출하기</button>
    </form>
  );
}

export default ControlledInput;
