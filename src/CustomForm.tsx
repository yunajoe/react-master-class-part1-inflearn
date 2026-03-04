import { ChangeEvent, SubmitEvent, useState } from "react";

function CustomForm() {
  const [form, setForm] = useState({
    fruit: "apple", // apple | banana | orange
    isSubscribed: false,
    channel: "email", // email | sms | push
    submitted: false,
  });

  const handleSelectFruit = (
    e: ChangeEvent<HTMLSelectElement, HTMLSelectElement>,
  ) => {
    setForm((prev) => {
      return {
        ...prev,
        fruit: e.target.value,
      };
    });
  };
  const handleSubscribe = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => {
      return {
        ...prev,
        isSubscribed: e.target.checked,
      };
    });
  };
  const handleChannel = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => {
      return {
        ...prev,
        channel: e.target.value,
      };
    });
  };

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setForm((prev) => {
      return {
        ...prev,
        submitted: !prev.submitted,
      };
    });
  };

  return (
    <div>
      <h3>커스텀 폼</h3>
      <form onSubmit={handleSubmit}>
        <label>과일을 선택하기</label>
        <select value={form.fruit} onChange={handleSelectFruit}>
          <option value="apple">사과</option>
          <option value="banana">바나나</option>
          <option value="orange">오렌지</option>
        </select>

        <label>구독여부</label>
        <input
          checked={form.isSubscribed}
          type="checkbox"
          onChange={handleSubscribe}
        />

        <fieldset>
          <legend>알림 채널</legend>
          <label>이메일</label>
          <input
            type="radio"
            name="channel"
            value="email"
            onChange={handleChannel}
          />
          <label>SMS</label>
          <input
            type="radio"
            name="channel"
            value="sms"
            onChange={handleChannel}
          />
          <label>PUSH</label>
          <input
            type="radio"
            name="channel"
            value="push"
            onChange={handleChannel}
          />
        </fieldset>
        <button type="submit">제출하기</button>
      </form>
      <div>
        <h3>실시간 미리보기</h3>
        <p>선택한 과일: {form.fruit}</p>
        <p>구독 여부: {form.isSubscribed ? "구독" : "미구독"}</p>
        <p>알림 채널: {form.channel}</p>
      </div>
      {form.submitted && (
        <div>
          <p>제출되었습니다.</p>
          과일 {form.fruit} / 구독 {form.isSubscribed ? "O" : "X"} / 채널{" "}
          {form.channel}
        </div>
      )}
    </div>
  );
}

export default CustomForm;
