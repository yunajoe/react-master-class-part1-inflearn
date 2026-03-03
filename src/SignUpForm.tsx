import { ChangeEvent, SubmitEvent, useState } from "react";

function SignUpForm() {
  const [user, setUser] = useState({
    userName: "",
    userEmail: "",
    userAge: "",
  });
  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (user.userName.length < 2) {
      alert("이름은 두 글자 이상 입력해주세요.");
      return;
    }

    if (!user.userEmail.includes("@")) {
      alert("올바른 이메일 주소를 입력하세요.");
      return;
    }

    if (Number.isNaN(Number(user.userAge))) {
      alert("나이는 숫자만 입력할 수 있습니다.");
      return;
    }

    alert(`제출된 정보 ${user.userName} ${user.userEmail} ${user.userAge}`);
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
    const { name, value } = e.target;

    setUser((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label>이름</label>
          <input
            type="text"
            value={user.userName}
            name="userName"
            onChange={handleChange}
            placeholder="이름"
          />
        </div>
        <div>
          <label>이메일</label>
          <input
            type="email"
            value={user.userEmail}
            name="userEmail"
            onChange={handleChange}
            placeholder="이메일"
          />
        </div>
        <div>
          <label>나이</label>
          <input
            value={user.userAge}
            name="userAge"
            onChange={handleChange}
            placeholder="나이"
          />
        </div>
        <button type="submit">제출</button>
      </form>
      <p>
        제출된 정보: {user.userName} {user.userEmail} {user.userAge}
      </p>
    </>
  );
}

export default SignUpForm;
