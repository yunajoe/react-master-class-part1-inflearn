async function fetchWithBackOff(fn, { retries = 3, base = 300 } = {}) {
  let attempt = 0;
  while (true) {
    try {
      return await fn();
    } catch (e) {
      if (attempt >= retries) throw e;
      const wait = base * 2 ** attempt;
      await new Promise((r) => setTimeout(r, wait));
      attempt++;
    }
  }
}
function SearchBox() {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);
  const debouncedKeyword = useDebouncedValue(keyword, 400);

  useEffect(() => {
    if (!debouncedKeyword) return;
    const controller = new AbortController();

    const fetchData = async () =>
      await fetchWithBackOff(() =>
        apiClient.get(`/search?q=${encodeURIComponent(debouncedKeyword)}`, {
          signal: controller.signal,
        }),
      );

    return () => controller.abort();
  }, [debouncedKeyword]);

  return (
    <div>
      <input
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="검색어"
      />
      <ul>
        {results.map((i) => (
          <li key={i.id}>{i.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default SearchBox;
