import { useState } from "react";
import "./App.css";
import ValidateForm from "./ValidateForm.tsx";

function App() {
  const [checked, setChecked] = useState(false);

  return (
    <>
      {/* <Checkbox checked={checked} setChecked={setChecked} />
      <Summary checked={checked} />
      <Form />
      <ControlledInput />
      <SignUpForm /> */}
      {/* <CustomForm /> */}
      <ValidateForm />
    </>
  );
}

export default App;
