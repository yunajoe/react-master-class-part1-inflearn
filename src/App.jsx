import { useState } from "react";
import "./App.css";
import CustomForm from "./CustomForm.tsx";

function App() {
  const [checked, setChecked] = useState(false);

  return (
    <>
      {/* <Checkbox checked={checked} setChecked={setChecked} />
      <Summary checked={checked} />
      <Form />
      <ControlledInput />
      <SignUpForm /> */}
      <CustomForm />
    </>
  );
}

export default App;
