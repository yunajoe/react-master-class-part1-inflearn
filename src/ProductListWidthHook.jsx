import useFetch from "./hooks/useFetch";

function ProductListWidthHook() {
  // hook을 사용
  const { data, loading, error, refetch } = useFetch("/products");

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
        <input />
        <select>
          <option value="men's clothing">남성의류</option>
          <option value="women's clothing">여성의류</option>
          <option value="jewelery">보석류</option>
          <option value="electronics">전자제품</option>
        </select>
        <select>
          <option value="rate">평점 높은 순</option>
          <option value="count">리뷰 많은 순</option>
        </select>
      </div>
      {data.map((item) => (
        <div key={item.id}>
          <p>{item.title}</p>
        </div>
      ))}
    </div>
  );
}

export default ProductListWidthHook;
