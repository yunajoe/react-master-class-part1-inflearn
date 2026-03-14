import { useEffect, useState } from "react";
import instance from "./lib/axios";

// 카테고리 필터를 의존성에 추가해 값 변경 시 이전 요청을 취소하고 새 요청 수행.
// 디바운스 검색: keyword 파생 상태(300ms)로 의존성 구성 + AbortController로 레이스 차단.
// 인터셉터 재시도(지수 백오프, 5xx 한정) 또는 전역 토스트 알림 연동.

function ProductListBase() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [keyword, setKeyword] = useState("");

  // 처음 데이터를 fetch 할때
  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      try {
        const res = await instance.get("/products", {
          signal: controller.signal,
        });
        setProducts(res.data);
        setError(null);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    return () => {
      controller.abort("cancel");
    };
  }, []);

  if (loading) return <p>불러오는 중...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  return (
    <>
      <div>
        {products.map((p) => (
          <li key={p.id}>{p.title}</li>
        ))}
      </div>
    </>
  );
}

export default ProductListBase;
