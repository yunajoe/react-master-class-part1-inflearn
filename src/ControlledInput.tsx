import { SubmitEvent, useState } from "react";

function ControlledInput() {
  const [nameValue, setNameValue] = useState("");
  const [able, setDisable] = useState(true);
  const handleClick = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (nameValue.length < 2) {
      alert("이름은 2자 이상 입력하세요");
      return;
    }
    alert(`현재 입력값: ${nameValue}`);
  };

  return (
    <form onSubmit={handleClick}>
      <input
        value={nameValue}
        onChange={(e) => {
          const value = e.target.value.trim();
          if (!value) {
            setDisable(true);
          } else {
            setDisable(false);
          }
          setNameValue(value);
        }}
      />
      <p>현재 입력값:{nameValue}</p>
      <button type="submit" disabled={able}>
        제출하기
      </button>
    </form>
  );
}

export default ControlledInput;
