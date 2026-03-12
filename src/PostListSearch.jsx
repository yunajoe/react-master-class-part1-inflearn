import { useEffect, useState } from "react";

function PostListSearch() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");

  // 디바운스 적용 (300ms~500ms 추천)
  const fetchData = async (search, signal) => {
    setLoading(true);
    setError(false);
    try {
      const result = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_limit=5&q=${search}`,
        { signal },
      );
      if (!result.ok) {
        throw new Error("에");
      }
      const jsonData = await result.json();
      console.log("jsonData ===>", jsonData);
      setPosts(jsonData);
    } catch (error) {
      if (error.name !== "AbortError") {
        setError(true);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!search.trim()) {
      setPosts([]);
      setLoading(false);
      setError(false);
      return;
    }

    const controller = new AbortController();

    // debounce
    const timerId = setTimeout(() => {
      fetchData(search, controller.signal);
    }, 500);

    return () => {
      controller.abort();
      clearTimeout(timerId);
    };
  }, [search]);

  return (
    <div>
      <input
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      {loading && <p>로딩중</p>}

      {error && <p>{error}</p>}
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
    </div>
  );
}

export default PostListSearch;
