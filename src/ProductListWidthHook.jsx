import { useState } from "react";
import useFetch from "./hooks/useFetch";

function ProductListWidthHook() {
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("asc");

  const { data, loading, error, refetch } = useFetch({
    keyword,
    category,
    sort,
  });

  if (loading) return <p>로딩중</p>;
  if (error) return <p>에러가 났습니다</p>;

  return (
    <div>
      <div
        style={{
          border: "5px solid blue",
          display: "flex",
          columnGap: "10px",
          justifyContent: "center",
        }}
      >
        <input
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value);
          }}
        />
        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
          }}
        >
          <option value="">전체보기</option>
          <option value="men's clothing">남성의류</option>
          <option value="women's clothing">여성의류</option>
          <option value="jewelery">보석류</option>
          <option value="electronics">전자제품</option>
        </select>
        <select
          value={sort}
          onChange={(e) => {
            setSort(e.target.value);
          }}
        >
          <option value="asc">오름차순</option>
          <option value="desc">내림차순</option>
        </select>
      </div>
      {data.map((item) => (
        <div key={item.id}>
          <p>{item.title}</p>
        </div>
      ))}
      <button onClick={refetch}>수동 refetch</button>
    </div>
  );
}

export default ProductListWidthHook;
