import { MouseEvent, useState } from "react";

function Button() {
  const [isHover, setIsHover] = useState(false);
  const handleMouseEnter = (e: MouseEvent<HTMLButtonElement>) => {
    setIsHover(true);
  };
  const handleMouseLeave = (e: MouseEvent<HTMLButtonElement>) => {
    setIsHover(false);
  };

  const handleContextMenu = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };
  return (
    <div style={{ border: "5px solid green", position: "relative" }}>
      <button
        style={{
          border: "none",
          padding: "8px",
          background: isHover ? "rgba(21, 35, 235, 0.8)" : "",
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onContextMenu={handleContextMenu}
      >
        Button
      </button>
      {isHover && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            top: "-100%",
            background: "orange",
            width: "100px",
            height: "40px",
          }}
        >
          튤팁정보
        </div>
      )}
    </div>
  );
}

export default Button;
