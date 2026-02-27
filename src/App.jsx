import { useState } from "react";
import "./App.css";
import Checkbox from "./Checkbox.tsx";
import Summary from "./Summary.tsx";

function App() {
  const [checked, setChecked] = useState(false);

  const handleCheck = () => {
    setChecked((prev) => !prev);
  };

  return (
    <>
      <Checkbox checked={checked} handleCheck={handleCheck} />
      <Summary checked={checked} handleCheck={handleCheck} />
    </>
  );
}

export default App;
