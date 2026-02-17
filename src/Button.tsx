import { MouseEvent, useState } from "react";

function Button() {
  const [count, setCount] = useState(0);
  const [asyncCount, setAsyncCount] = useState(0);
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    const step = Number(e.currentTarget.dataset.step);
    setCount((prev) => prev + step);
  };

  const handleAsyncClick = () => {
    setTimeout(() => {
      setAsyncCount((prev) => prev + 3);
    }, 1000);
  };
  return (
    <div>
      <p>COUNT: {count}</p>
      <p>AsyncCount: {asyncCount}</p>
      <button data-step="2" onClick={handleClick}>
        +2씩 증가
      </button>
      <button onClick={handleAsyncClick}>비동기 +3씩 증가</button>
    </div>
  );
}

export default Button;
