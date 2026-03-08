import { useEffect, useState } from "react";

type Item = {
  id: number;
  title: string;
};

function LiveFetch() {
  const [keyword, setKeyword] = useState("");
  const [data, setData] = useState<Item[]>();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    setLoading(true);
    (async () => {
      try {
        const result = await fetch(`/api/items?kw=${keyword}`, { signal });
        setData(await result.json());
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          setError(true);
        }
      } finally {
        setLoading(false);
      }
    })();

    return () => {
      controller.abort();
    };
  }, [keyword]);
  return (
    <div>
      <input value={keyword} onChange={(e) => setKeyword(e.target.value)} />
      <div>
        {loading ? (
          <p>로딩중</p>
        ) : (
          <div>
            {data?.length === 0 ? (
              <p>데이터가 없습니다.</p>
            ) : (
              <div>
                {data?.map((item) => (
                  <p>{item.title}</p>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default LiveFetch;
