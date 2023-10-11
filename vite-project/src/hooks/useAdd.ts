import { useState, useCallback } from 'react';

const useAddData = <T,>(addFunction: (data: T) => Promise<T>) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [isAdded, setIsAdded] = useState(false);
  const [addedData, setAddedData] = useState<T | null>(null);

  const handleAdd = useCallback(async (data: T) => {
    setLoading(true);
    try {
      const result = await addFunction(data);
      setAddedData(result);
      setIsAdded(true);
    } catch (err) {
      if (err instanceof Error) {
        setError(err);
      }
    } finally {
      setLoading(false);
    }
  }, [addFunction]);

  return { loading, error, isAdded, addedData, handleAdd };
};

export default useAddData;
