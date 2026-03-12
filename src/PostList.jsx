import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";

function PostList() {
  const [posts, setPosts] = useState([]);

  const fetchAPI = async () => {
    try {
      const { status, data } = await axios.get(
        "https://jsonplaceholder.typicode.com/posts",
      );
      if (status >= 400) {
        throw new Error("[ERROR] 에러가 났습니다.");
      }
      const slicedData = data.slice(0, 10);
      setPosts(slicedData);
    } catch (error) {
      console.log(error, error.message);
    }
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <>
      <h2>📄 게시글 목록</h2>
      <div>
        {posts.length === 0 ? (
          <p>로딩 중...</p>
        ) : (
          <div>
            {posts.map((post) => (
              <li key={post.id}>
                <strong>{post.title}</strong>
                <p>{post.body}</p>
              </li>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default PostList;
