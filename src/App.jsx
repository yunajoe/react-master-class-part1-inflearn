import { useState } from "react";
import "./App.css";
import ControlledInput from "./ControlledInput.tsx";

function App() {
  const [checked, setChecked] = useState(false);

  return (
    <>
      {/* <Checkbox checked={checked} setChecked={setChecked} />
      <Summary checked={checked} />
      <Form /> */}
      <ControlledInput />
    </>
  );
}

export default App;
