import { useState, useEffect } from "react";
import debounce from "lodash/debounce";

export default function useFetchingData(
  param,
  fetchingData,
  debounceFetchingInMs
) {
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    setHasError(false);

    if (!param) {
      setLoading(false);
      return;
    }

    setLoading(true);
    const debounceFetchingData = debounce(async (param) => {
      try {
        const data = await fetchingData(param);
        setData(data);
      } catch (error) {
        setHasError(true);
        setData(null);
      } finally {
        setLoading(false);
      }
    }, debounceFetchingInMs);

    debounceFetchingData(param);

    return () => debounceFetchingData.cancel();
  }, [param, fetchingData, debounceFetchingInMs]);

  return { hasError, loading, data };
}
