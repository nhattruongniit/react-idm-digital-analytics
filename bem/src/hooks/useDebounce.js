import { useState, useEffect } from 'react';

const useDebounce = (text, delay = 700) => {
  const [debounce, setDebounce] = useState(text);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounce(text)
    }, delay);

    return () => {
      clearTimeout(handler);
    }
  }, [text, delay]);

  return debounce;
}

export default useDebounce;