import { useState } from "react";
import "./App.css";
import LiveSearch from "./LiveSearch";

function App() {
  const [close, setClose] = useState(false);
  const [close2, setClose2] = useState(false);

  const [unmount, setUnmount] = useState(false);

  const handleClose = () => {
    console.log("handleClose");
    setClose(true);
  };
  const handleClose2 = () => {
    console.log("handleClose2");
    setClose2(true);
  };

  const handleUnmount = () => {
    setUnmount(true);
  };
  return (
    <>
      {/* <EffectLogger /> */}
      {/* {!close && <Modal onClose={handleClose} num={1} />}
      {!close2 && <Modal onClose={handleClose2} num={2} />} */}
      {/* {!unmount && <WindowsizeTracker />}
      <button onClick={handleUnmount}>언마운트시키기</button> */}
      {/* <Count /> */}
      {/* <DarkModeToggle /> */}
      <LiveSearch />
    </>
  );
}

export default App;
