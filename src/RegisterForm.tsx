import { useState } from "react";

function RegisterForm() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  return (
    <form>
      <input
        type="text"
        placeholder="이름"
        aria-invalid={error ? "true" : "false"}
        aria-description={error ? "form-error" : undefined}
      />
      <input
        type="email"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit" disabled={!username || !email}>
        제출
      </button>
      {error && (
        <p id="form-error" style={{ color: "red" }} aria-live="polite">
          {error}
        </p>
      )}
    </form>
  );
}

export default RegisterForm;
