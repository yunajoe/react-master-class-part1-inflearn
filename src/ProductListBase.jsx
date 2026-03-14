import { useEffect, useState } from "react";
import instance from "./lib/axios";

function ProductListBase() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      try {
        const res = await instance.get("/products", {
          signal: controller.abort(),
        });
        setProducts(res.data);
      } catch (error) {
        if (error.code === "ERROR_CANCELED") return;
        setError(normalizeAxiosError(error));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    return () => {
      console.log("cleanup");
      controller.abort("cancel");
    };
  }, []);
  if (loading) return <p>불러오는 중...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  return (
    <div>
      {products.map((p) => (
        <li key={p.id}>{p.title}</li>
      ))}
    </div>
  );
}

export default ProductListBase;
