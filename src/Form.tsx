import { SubmitEvent, useState } from "react";

function Form() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("submit 폼 제출");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          alert("폼 제출");
        }}
      >
        폼 제출
      </button>
    </form>
  );
}

export default Form;
