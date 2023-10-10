import { useState, useCallback } from 'react';

interface UpdateState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

const useUpdateData = <T,>(updateFunction: (id: number, data: T) => Promise<T>): UpdateState<T> & {
  handleUpdate: (id: number, data: T) => Promise<void>;
} => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const handleUpdate = useCallback(
    async (id: number, updatedData: T) => {
      setLoading(true);
      try {
        const responseData = await updateFunction(id, updatedData);
        setData(responseData);
      } catch (err) {
        if (err instanceof Error) {
          setError(err);
        }
      } finally {
        setLoading(false);
      }
    },
    [updateFunction]
  );

  return { data, loading, error, handleUpdate };
};

export default useUpdateData;
