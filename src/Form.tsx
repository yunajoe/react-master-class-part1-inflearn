import { useState } from "react";
import Inputs from "./Inputs";
import Preview from "./Preview";

function Form() {
  const [newsLetterTitle, setNewsLetterTitle] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  return (
    <div style={{ border: "5px solid blue" }}>
      <h1>뉴스레터 구독</h1>
      <div style={{ display: "flex", flexDirection: "row", columnGap: "40px" }}>
        <Inputs
          newsLetterTitle={newsLetterTitle}
          name={name}
          email={email}
          setNewsLetterTitle={setNewsLetterTitle}
          setName={setName}
          setEmail={setEmail}
        />
        <Preview newsLetterTitle={newsLetterTitle} name={name} email={email} />
      </div>
    </div>
  );
}

export default Form;
