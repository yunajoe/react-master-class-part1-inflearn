import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import instance from "../services/apiClient";

function useFetch(params = { keyword: "", category: "", sort: "" }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const controllerRef = useRef(null);

  const { keyword, category, sort } = params;

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    if (controllerRef.current) {
      controllerRef.current.abort();
    }
    const controller = new AbortController();
    controllerRef.current = controller;
    const qs = new URLSearchParams();
    if (sort) {
      qs.set("sort", sort);
    } // qs.toString() 과 같다
    const url = category
      ? `https://fakestoreapi.com/products/category/${encodeURIComponent(category)}?${qs}`
      : `https://fakestoreapi.com/products?${qs}`;

    try {
      const res = await instance.get(url, {
        signal: controller.signal,
      });
      setData(res.data);
    } catch (error) {
      if (axios.isCancel(error)) {
        return;
      }
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [keyword, category, sort]);

  useEffect(() => {
    fetchData();
    return () => {
      if (controllerRef.current) {
        controllerRef.current.abort();
      }
    };
  }, [fetchData]);

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch };
}

export default useFetch;
