import { useState } from "react";

function Toggle() {
  const [isOn, setIsOn] = useState(false);
  const [backgroundToggle, setBackGroundToggle] = useState(false);

  const handleToggle = () => {
    setIsOn(!isOn);
  };
  const handleBackgroundToggle = () => {
    setBackGroundToggle(!backgroundToggle);
  };

  return (
    <div
      style={{
        background: backgroundToggle ? "#3159d0" : "#f9f2f2",
        color: "#000",
      }}
    >
      <p>{isOn ? "켜짐 상태" : "꺼짐 상태"}</p>
      <button
        onClick={handleToggle}
        style={{ background: isOn ? "#4caf50" : "#ccc" }}
      >
        버튼 토글 버튼
      </button>
      <button
        onClick={handleBackgroundToggle}
        style={{ background: backgroundToggle ? "#4caf50" : "#ccc" }}
      >
        백그라운드 토글 버튼
      </button>
    </div>
  );
}

export default Toggle;
