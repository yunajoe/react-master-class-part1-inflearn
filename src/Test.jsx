import { useEffect, useState } from "react";

function SearchBox() {
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    if (keyword !== "") {
      console.log(`"${keyword}" 로 검색을 실행합니다.`);
      // fetch(`/api/search?q=${encodeURIComponent(keyword)}`) ...
    }
  }, [keyword]); // keyword 바뀔 때만

  return (
    <input
      value={keyword}
      placeholder="검색어를 입력하세요"
      onChange={(e) => setKeyword(e.target.value)}
    />
  );
}
