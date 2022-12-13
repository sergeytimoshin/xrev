import { useCallback,useState } from 'react';

import { isCanceled } from '../utils/makeCancelable';

export type LoadingHook<TData> = {
  wrap: (promise: Promise<TData>) => void;
  loading: boolean;
  error: Error | undefined;
  data: TData | undefined;
  setError: (error: Error | undefined) => void;
};

export function useLoading<TData>(initialData?: TData): LoadingHook<TData> {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | undefined>(undefined);
  const [data, setData] = useState<TData | undefined>(initialData);

  const wrap = useCallback(
    async (promise: Promise<TData>): Promise<void> => {
      setLoading(true);
      setError(undefined);

      try {
        const newData = await promise;
        setLoading(false);
        setData(newData);
      } catch (err) {
        if (!isCanceled(err)) {
          setLoading(false);
          setError(err as Error);
        }
      }
    },
    [],
  );

  return { wrap, loading, error, data, setError };
}
