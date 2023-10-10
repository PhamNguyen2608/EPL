import { useState, useEffect, useCallback } from 'react';

export const useFetchData = <T>(apiCall: () => Promise<T>, initialData: T, shouldFetch = true) => {
  const [data, setData] = useState<T>(initialData);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    if (!shouldFetch) return;

    setLoading(true);
    try {
      const result = await apiCall();
      setData(result);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [apiCall, shouldFetch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, setData, loading, error };
};
