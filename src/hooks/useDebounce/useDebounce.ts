import { useEffect, useState } from 'react';

export default function useDebounce(text: string | undefined, delay: number) {
  const [value, setValue] = useState<string | undefined>('');

  useEffect(() => {
    const timerId = setTimeout(() => {
      setValue(text);
    }, delay);
    return () => {
      clearTimeout(timerId);
    };
  }, [text, delay]);
  return value;
}
