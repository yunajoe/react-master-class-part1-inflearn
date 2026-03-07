import { useEffect, useState } from "react";

function WindowsizeTracker() {
  const [winnerWidth, setWinnerWidth] = useState(window.innerWidth);
  const handleResize = () => {
    const currentWidth = window.innerWidth;
    setWinnerWidth(currentWidth);
  };

  useEffect(() => {
    // mount 될때
    window.addEventListener("resize", handleResize);
    console.log("등록");

    // unmount 될때
    return () => {
      window.removeEventListener("resize", handleResize);
      console.log("제거");
    };
  }, []);
  return <p>현재 창 너비: {winnerWidth}px</p>;
}

export default WindowsizeTracker;
