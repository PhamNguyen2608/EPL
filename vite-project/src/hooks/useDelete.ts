
import { useState, useCallback } from 'react';

const useDeleteData = <T,>(deleteFunction: (id: number | string) => Promise<T>) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [isDeleted, setIsDeleted] = useState(false);

  const handleDelete = useCallback(async (id: number | string) => {
    setLoading(true);
    try {
      await deleteFunction(id);
      setIsDeleted(true);
    } catch (err) {
      if (err instanceof Error) {
        setError(err);
      }
    } finally {
      setLoading(false);
    }
  }, [deleteFunction]);

  return { loading, error, isDeleted, handleDelete };
};

export default useDeleteData;
