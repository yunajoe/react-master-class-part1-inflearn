import { useState } from "react";
import "./App.css";
import Modal from "./Modal";

function App() {
  const [close, setClose] = useState(false);
  const [close2, setClose2] = useState(false);

  const handleClose = () => {
    console.log("handleClose");
    setClose(true);
  };
  const handleClose2 = () => {
    console.log("handleClose2");
    setClose2(true);
  };
  return (
    <>
      {/* <EffectLogger /> */}
      {!close && <Modal onClose={handleClose} num={1} />}
      {!close2 && <Modal onClose={handleClose2} num={2} />}
    </>
  );
}

export default App;
