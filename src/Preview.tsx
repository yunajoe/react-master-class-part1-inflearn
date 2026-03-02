interface PreviewProps {
  newsLetterTitle: string;
  name: string;
  email: string;
}
function Preview({ newsLetterTitle, name, email }: PreviewProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <form action="/form-submit" method="get">
        <div>
          <label>뉴즈레터 제목</label>
          <input readOnly value={newsLetterTitle} />
        </div>
        <div>
          <label>이름</label>
          <input readOnly value={name} />
        </div>
        <div>
          <label>이메일</label>
          <input readOnly value={email} />
        </div>
        <button type="submit">제출하기</button>
      </form>
    </div>
  );
}

export default Preview;
