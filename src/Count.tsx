import { useState } from "react";

function Count() {
  const [count, setCount] = useState(0);
  const [clicks, setClicks] = useState(0);
  const handleIncrease = () => {
    setCount((prev) => prev + 1);
    setClicks((prev) => prev + 1);
  };
  const handleDecrease = () => {
    setCount((prev) => prev - 1);
    setClicks((prev) => prev + 1);
  };
  return (
    <div>
      <p>현재 카운트: {count}</p>
      <p>현재 클릭된 수 : {clicks}</p>
      <button onClick={handleIncrease}>증가 버튼</button>
      <button onClick={handleDecrease}>감소 버튼</button>
    </div>
  );
}

export default Count;
