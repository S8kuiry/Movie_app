import { useEffect, useState } from "react";

// Generic hook: T = type of the data returned by fetchFunction
const useFetch = <T>(fetchFunction: () => Promise<T>, autoFetch = true) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await fetchFunction();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("An error occurred"));
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setData(null);
    setLoading(false);
    setError(null);
  };

  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
    // ✅ dependencies: re-run if fetchFunction or autoFetch changes
  }, [autoFetch, fetchFunction]);

  return { data, loading, error, refetch: fetchData, reset };
};

export default useFetch;
