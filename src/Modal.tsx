import { useEffect } from "react";

function Modal({ onClose, num }: { onClose: () => void; num: number }) {
  const handleEsc = (e: any) => {
    if (e.key === "Escape") {
      onClose();
    }
  };
  useEffect(() => {
    console.log("useEFFECT", num);
    window.addEventListener("keydown", handleEsc);
    console.log("ESC 이벤트 등록됨", num);

    return () => {
      window.removeEventListener("keydown", handleEsc);
      console.log("ESC 이벤트 제거됨", num);
    };
  });
  return (
    <div className="modal">
      <h2>모달 창 {num}</h2>
      <p>ESC 키를 누르면 닫힙니다.</p>
    </div>
  );
}

export default Modal;
