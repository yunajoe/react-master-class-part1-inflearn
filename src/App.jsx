import { useState } from "react";
import "./App.css";
import Checkbox from "./Checkbox.tsx";
import Form from "./Form.tsx";
import Summary from "./Summary.tsx";

function App() {
  const [checked, setChecked] = useState(false);

  return (
    <>
      <Checkbox checked={checked} setChecked={setChecked} />
      <Summary checked={checked} />
      <Form />
    </>
  );
}

export default App;
