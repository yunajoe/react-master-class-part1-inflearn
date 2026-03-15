// useFetchProducts(params) 훅 구현 (params: { keyword?, category?, sort? }).
// 훅은 { data, loading, error, refetch }

// /products?${qs.toString()}, products

import axios from "axios";
import { useEffect, useState } from "react";
import instance from "../services/apiClient";

function useFetch(url, params = { keyword: "", category: "", sort: "" }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { keyword, category, sort } = params;

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      try {
        const res = await instance.get(url, {
          signal: controller.signal,
        });
        console.log("RES ===>", res);
        setData(res.data);
        setError(null);
      } catch (error) {
        console.log("error", error, error.name);
        if (axios.isCancel(error)) {
          console.log("취소!");
          return;
        }
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    return () => {
      controller.abort();
    };
  }, []);

  return { data, loading, error };
}

export default useFetch;
