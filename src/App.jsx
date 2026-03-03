import { useState } from "react";
import "./App.css";
import SignUpForm from "./SignUpForm.tsx";

function App() {
  const [checked, setChecked] = useState(false);

  return (
    <>
      {/* <Checkbox checked={checked} setChecked={setChecked} />
      <Summary checked={checked} />
      <Form />
      <ControlledInput /> */}
      <SignUpForm />
    </>
  );
}

export default App;
