import { useEffect } from "react";

function Example() {
  const [data, setData] = useState(null);
  const [stale, setStale] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      if (!data) {
        const r = apiClient.get("/products", { signal: controller.signal });
        setData(r.data);
      } else {
        setStale(true);
        const r = await apiClient.get("/products", {
          signal: controller.signal,
        });
        setData(r.data);
        setStale(false);
      }
    })();
  }, []);
  return (
    <>
      {stale && <p>새로고침 중...</p>}
      {!data ? (
        <p>로딩...</p>
      ) : (
        <ul>
          {data.map((p) => (
            <li key={p.id}>{p.title}</li>
          ))}
        </ul>
      )}
    </>
  );
}

export default Example;
