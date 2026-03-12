import { useEffect, useState } from "react";

const URL = "https://jsonplaceholder.typicode.com/posts?_limit=5";

function PostListBase() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const fetchData = async (url, signal) => {
    try {
      const result = await fetch(url, { signal });
      if (!result.ok) {
        throw new Error("요청이 잘 못 되었습니다.");
      }
      const jsonData = await result.json();
      setPosts(jsonData);
      setError(false);
    } catch (error) {
      if (error.name !== "AbortError") {
        console.log("error", error, error.name);
        setError(true);
      }
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal; // { aborted: false, reason: undefined, onbort:null}
    fetchData(URL, signal); // API
    // unmount시 abort
    return () => {
      console.log("clean up 함수 입니다.");
      controller.abort("unmount 되었습니다.");
    };
  }, []);

  return (
    <section>
      <h2>📄 게시글 (최대 5개)</h2>
      {loading && <p>로딩 중...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {posts && (
        <ul>
          {posts.map((p) => (
            <li key={p.id}>
              <strong>{p.title}</strong>
              <p>{p.body}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default PostListBase;
