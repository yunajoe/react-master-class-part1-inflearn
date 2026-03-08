import { useEffect, useState } from "react";

type Item = {
  id: number;
  title: string;
};

function LiveSearch() {
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("recent");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [items, setItems] = useState<Item[]>([]);

  const debounce_time = 3000;

  useEffect(() => {
    const abortController = new AbortController(); // network 실패 처리 모킹
    const signal = abortController.signal; // network 실패 처리 모킹

    const timerId = setTimeout(async () => {
      setLoading(true);
      signal.addEventListener("abort", () => {
        console.log("이 요청이 취소되었습니다 ✅");
      });

      try {
        const itemResult = await new Promise<Item[]>((resolve, reject) => {
          if (signal.aborted) {
            reject(new DOMException("Aborted", "AbortError"));
            return;
          }
          const result = Array.from({ length: 5 }, (_, index) => ({
            id: Math.random() * index,
            title: `${keyword}-${category}-${sort}`,
          }));
          resolve(result);
        });
        setItems(itemResult);
        abortController.signal.addEventListener("abort", () => {});
      } catch (error) {
        if (error.name !== "AbortError") {
          setError(true);
          setItems([]);
        }
      } finally {
        setLoading(false);
      }
    }, debounce_time);

    return () => {
      clearTimeout(timerId); // mock 데이터일 경우 충분
      abortController.abort(); // 실제 리얼워드에서는 이전 네트워크 요청 취소
    };
  }, [keyword, category, sort]);

  return (
    <div>
      <div
        style={{
          display: "grid",
          gap: 8,
          gridTemplateColumns: "1fr 140px 140px",
        }}
      >
        <input
          value={keyword}
          placeholder="검색어"
          onChange={(e) => setKeyword(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="all">전체</option>
          <option value="book">도서</option>
          <option value="movie">영화</option>
        </select>
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="recent">최신순</option>
          <option value="popular">인기순</option>
        </select>
      </div>
      {/* 검색결과 */}
      <div>
        {!keyword && <p>검색어를 입력해주세요</p>}
        {keyword && loading && <p>로딩중입니다.</p>}
        {keyword && !loading && items.length === 0 && <p>검색어가 없습니다.</p>}
        {keyword && !loading && items.length > 0 && (
          <div>
            {items.map((item) => (
              <div key={item.id}>
                <span>검색 제목: {item.title}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default LiveSearch;
