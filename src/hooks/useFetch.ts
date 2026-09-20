import { useEffect, useState } from "react";
import { fetchJson } from "../lib/fetchJson";

export interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface FetchResult<T> {
  url: string;
  data: T | null;
  error: string | null;
}

export function useFetch<T>(url: string): FetchState<T> {
  const [result, setResult] = useState<FetchResult<T> | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetchJson<T>(url)
      .then((data) => {
        if (!cancelled) setResult({ url, data, error: null });
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setResult({
            url,
            data: null,
            error: err instanceof Error ? err.message : "Something went wrong.",
          });
        }
      });

    // Cleanup: a late response for an old url (or after unmount) is ignored
    return () => {
      cancelled = true;
    };
  }, [url]);

  // Only trust a result that belongs to the url we're asking about now
  const settled = result !== null && result.url === url ? result : null;

  return {
    data: settled?.data ?? null,
    loading: settled === null,
    error: settled?.error ?? null,
  };
}