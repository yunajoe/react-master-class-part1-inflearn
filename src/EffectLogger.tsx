import { useEffect, useRef, useState } from "react";

function EffectLogger() {
  const [count, setCount] = useState(0);
  const [log, setLog] = useState("Effect 준비 중...");
  const [renderCount, setRenderCount] = useState(0);
  const ref = useRef(0);
  const callback = (count: number) => {
    console.log("callback", count);
  };

  useEffect(() => {
    console.log("Effect 실행: count =", count, "| run#", ref.current);
    ref.current += 1;
    setLog(`🟢 매번 Effect 실행 (count = ${count})`);

    const intervalId = setInterval(callback, 1000, count);
    return () => {
      console.log("🧹 Cleanup 실행 (이전 effect 정리) | run#", ref.current);
      setLog(`🧹 Cleanup 실행 (count = ${count})`);
      clearInterval(intervalId);
    };
  });
  return (
    <div style={{ fontFamily: "sans-serif", padding: 20 }}>
      <h2>🧩 useEffect (no deps) 실험</h2>
      <p>현재 카운트: {count}</p>
      <p>최근 로그: {log}</p>
      <p>
        현재 렌더링 된 수 :{ref.current}, {renderCount}
      </p>
      <button onClick={() => setCount((c) => c + 1)}>+1</button>
      <button onClick={() => setCount((c) => c - 1)}>-1</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}

export default EffectLogger;
