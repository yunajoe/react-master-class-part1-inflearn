import { useState } from "react";

function Post() {
  const [post, setPosts] = useState([
    {
      id: 1,
      title: "첫 번째 글",
      author: { name: "철수", email: "chul@example.com" },
    },
    {
      id: 2,
      title: "두 번째 글",
      author: { name: "영희", email: "young@example.com" },
    },
  ]);
  const [nameInputs, setNameInputs] = useState<{ [key: number]: string }>({
    1: "",
    2: "",
  });

  const [emailInputs, setEmailInputs] = useState<{ [key: number]: string }>({
    1: "",
    2: "",
  });

  const handleChangeName = (id: number, newName: string) => {
    setPosts((prev) => {
      return prev.map((item) =>
        item.id === id
          ? { ...item, author: { ...item.author, name: newName } }
          : item,
      );
    });
    setNameInputs((prev) => {
      return {
        ...prev,
        [id]: "",
      };
    });
  };

  const handleChangeEmail = (id: number, newEmail: string) => {
    setPosts((prev) => {
      return prev.map((item) =>
        item.id === id
          ? { ...item, author: { ...item.author, email: newEmail } }
          : item,
      );
    });
    setEmailInputs((prev) => {
      return {
        ...prev,
        [id]: "",
      };
    });
  };

  return (
    <div>
      <div>
        {post.map((item) => (
          <div
            key={item.id}
            style={{ border: "3px solid #fff", marginBottom: "20px" }}
          >
            <p>제목: {item.title}</p>
            <span>
              작가: {item.author.name} - {item.author.email}
            </span>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div>
                <input
                  value={nameInputs[item.id]}
                  onChange={(e) => {
                    setNameInputs((prev) => {
                      return {
                        ...prev,
                        [item.id]: e.target.value,
                      };
                    });
                  }}
                />
                <button
                  onClick={() => handleChangeName(item.id, nameInputs[item.id])}
                >
                  이름 변경하기
                </button>
              </div>
              <div>
                <input
                  value={emailInputs[item.id]}
                  onChange={(e) => {
                    setEmailInputs((prev) => {
                      return {
                        ...prev,
                        [item.id]: e.target.value,
                      };
                    });
                  }}
                />
                <button
                  onClick={() =>
                    handleChangeEmail(item.id, emailInputs[item.id])
                  }
                >
                  이메일 변경하기
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Post;
