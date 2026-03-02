interface InputsProps {
  newsLetterTitle: string;
  name: string;
  email: string;
  setNewsLetterTitle: React.Dispatch<React.SetStateAction<string>>;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
}

function Inputs({
  newsLetterTitle,
  name,
  email,
  setNewsLetterTitle,
  setName,
  setEmail,
}: InputsProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <label>뉴스레터 제목</label>
        <input
          value={newsLetterTitle}
          onChange={(e) => {
            setNewsLetterTitle(e.target.value);
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <label>이름</label>
        <input
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <label>이메일</label>
        <input
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>
    </div>
  );
}

export default Inputs;
