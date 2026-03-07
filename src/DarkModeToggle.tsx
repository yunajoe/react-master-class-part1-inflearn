import { useEffect, useState } from "react";

const styles = `
  body { background-color: #d1cccc; transition: background-color .2s ease; color: #121212 }
  body.dark { background-color: #121212; color: #eaeaea; }
`;

function DarkModeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    console.log("USE EFFECT", dark);
    if (dark) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }

    // TODO: dark 값이 바뀔 때마다 body에 dark 클래스를 추가/제거
    // TODO: cleanup에서 항상 body의 dark 클래스를 제거
    return () => {
      console.log("USE EFFECT CLEAN UP", dark);
      document.body.classList.remove("dark");
    };
  }, [dark]);

  return (
    <section
      style={{ fontFamily: "system-ui", maxWidth: 560, margin: "32px auto" }}
    >
      <style>{styles}</style>
      <h2>🌙 다크 모드 토글</h2>

      <label
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: "8px 12px",
          borderRadius: 8,
          border: "1px solid #ddd",
        }}
      >
        <input
          type="checkbox"
          checked={dark}
          onChange={(e) => setDark(e.target.checked)}
        />
        다크 모드 켜기
      </label>

      <p style={{ marginTop: 12 }}>
        현재 모드: <strong>{dark ? "Dark" : "Light"}</strong>
      </p>
    </section>
  );
}

export default DarkModeToggle;
