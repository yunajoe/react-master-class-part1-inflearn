import { ChangeEvent, SubmitEvent, useState } from "react";

function ValidateForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    agree: false,
  });
  const [formError, setFormError] = useState({
    name: "",
    email: "",
    agree: "",
  });

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 에러가 있을 때
    if (!form.name.trim()) {
      setFormError((prev) => {
        return {
          ...prev,
          name: "사용자 이름을 입력하세요.",
        };
      });
    }
    if (!form.email.includes("@")) {
      setFormError((prev) => {
        return {
          ...prev,
          email: "올바른 이메일을 입력하세요.",
        };
      });
    }
    if (!form.agree) {
      setFormError((prev) => {
        return {
          ...prev,
          agree: "약관 동의에 체크해주세요.",
        };
      });
    }
    // 에러가 없을 때
    if (form.name.trim()) {
      setFormError((prev) => {
        return {
          ...prev,
          name: "",
        };
      });
    }
    if (form.email.includes("@")) {
      setFormError((prev) => {
        return {
          ...prev,
          email: "",
        };
      });
    }
    if (form.agree) {
      setFormError((prev) => {
        return {
          ...prev,
          agree: "",
        };
      });
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setForm((prev) => {
      return {
        ...prev,
        agree: checked,
      };
    });
  };
  console.log(Object.values(form).filter((v) => v));
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>이름 입력: {form.name}</label>
          <input name="name" value={form.name} onChange={handleChange} />
          {formError.name.length > 0 && (
            <p style={{ color: "red" }}>사용자 이름을 입력하세요.</p>
          )}
        </div>
        <div>
          <label>이메일 입력: {form.email}</label>
          <input name="email" value={form.email} onChange={handleChange} />
          {formError.email.length > 0 && (
            <p style={{ color: "red" }}>이메일을 정확히 입력해주세요.</p>
          )}
        </div>
        <div>
          <label>약관에 동의합니다. </label>
          <input
            name="agree"
            type="checkbox"
            checked={form.agree}
            onChange={handleCheck}
          />
          {formError.agree.length > 0 && (
            <p style={{ color: "red" }}>약관동의를 해주세요.</p>
          )}
        </div>
        <button type="submit">제출하기</button>
      </form>
      {Object.values(form).filter((v) => v).length > 0 &&
        Object.values(formError).filter((v) => v).length === 0 && (
          <p>제출에 성공하였습니다.</p>
        )}
    </div>
  );
}

export default ValidateForm;
