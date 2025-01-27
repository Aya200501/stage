import React from "react";

export const useDebounce = <T,>(value: T, delay: number = 500) => {
  const [debounceValue, setDebounceValue] = React.useState<T>(value);
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(value);
    }, delay);
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);
  return debounceValue;
};
