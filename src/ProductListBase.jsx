import { useEffect, useState } from "react";
import instance from "./lib/axios";

function ProductListBase() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
