import { useEffect, useState } from "react";

function useDebounce(keyword, delay) {
  const [debouncedValue, setDebouncedValue] = useState(keyword);

  useEffect(() => {
    const id = setTimeout(() => {
      setDebouncedValue(keyword);
    }, delay);

    return () => {
      clearTimeout(id);
    };
  });
  return debouncedValue;
}

export default useDebounce;
