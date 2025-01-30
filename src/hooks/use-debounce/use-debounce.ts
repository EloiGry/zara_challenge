import { useCallback, useRef } from 'react';

export function useDebouncedCallback<T extends (term: string) => void>(
  callback: T,
  delay: number
){
  const timer = useRef<NodeJS.Timeout | null>(null);

  const debouncedCallback = useCallback(
    (term: string) => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(() => {
        callback(term);
      }, delay);
    },
    [callback, delay]
  );
  return debouncedCallback;
}
