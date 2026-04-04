import { useState, useEffect, useCallback, useRef } from 'react';

export interface UseAsyncDataState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refresh: () => void;
  setData: React.Dispatch<React.SetStateAction<T | null>>;
}

export interface UseAsyncDataOptions<T> {
  fetchFn: () => Promise<T>;
  initialData?: T | null;
  dependencies?: unknown[];
  enabled?: boolean;
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
  onFinally?: () => void;
}

export function useAsyncData<T>({
  fetchFn,
  initialData = null,
  dependencies = [],
  enabled = true,
  onSuccess,
  onError,
  onFinally,
}: UseAsyncDataOptions<T>): UseAsyncDataState<T> {
  const [data, setData] = useState<T | null>(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const mountedRef = useRef(true);
  const fetchFnRef = useRef(fetchFn);
  fetchFnRef.current = fetchFn;

  const fetchData = useCallback(async () => {
    if (!enabled) return;

    setLoading(true);
    setError(null);

    try {
      const result = await fetchFnRef.current();
      if (mountedRef.current) {
        setData(result);
        onSuccess?.(result);
      }
    } catch (err) {
      if (mountedRef.current) {
        const error = err instanceof Error ? err : new Error(String(err));
        setError(error);
        onError?.(error);
      }
    } finally {
      if (mountedRef.current) {
        setLoading(false);
        onFinally?.();
      }
    }
  }, [enabled, onSuccess, onError, onFinally]);

  useEffect(() => {
    mountedRef.current = true;
    fetchData();

    return () => {
      mountedRef.current = false;
    };
  }, [fetchData, ...dependencies]);

  const refresh = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    refresh,
    setData,
  };
}

export default useAsyncData;
