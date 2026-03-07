import { useEffect, useState } from "react";

function Count() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("현재 카운트", count);
    return () => {
      console.log("CLEAN UP", count);
    };
  }, [count]);
  return (
    <div>
      <h2>카운터 로그 연습</h2>
      <p>현재 카운트: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  );
}

export default Count;
