import { useCallback, useEffect, useState } from 'react';

// Executa uma chamada à API e controla os estados de carregamento e erro.
export default function useApi(fetcher, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const load = useCallback(fetcher, deps);

  const run = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      setData(await load());
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [load]);

  useEffect(() => {
    run();
  }, [run]);

  return { data, loading, error, reload: run };
}
