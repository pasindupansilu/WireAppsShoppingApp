import constate from 'constate';
import {useCallback, useState} from 'react';

export const [LoaderStateProvider, useLoader] = constate(() => {
  const [loading, setLoading] = useState<boolean>(true);

  const showLoader = useCallback(() => setLoading(true), []);
  const hideLoader = useCallback(() => setLoading(false), []);

  return {
    loading,
    showLoader,
    hideLoader,
  };
});
