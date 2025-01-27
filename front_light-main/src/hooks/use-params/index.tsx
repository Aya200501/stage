import { useDebugValue } from "react";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";

function parse<T>(item: string, schema: z.ZodType<T>) {
  try {
    return item ? schema.parse(JSON.parse(item)) : schema.parse(undefined);
  } catch (e) {
    if (!item) throw e;
    return schema.parse(undefined);
  }
}

export type NonUndefined<T> = T extends undefined ? never : T;

function useParams<T>(
  key: string,
  schema: z.ZodType<T> & {
    _def: z.ZodDefaultDef<z.ZodType<T>>;
  }
): [NonUndefined<T>, (value: NonUndefined<T>) => void] {
  const [searchParams, setSearchParams] = useSearchParams({
    key: "",
  });
  const value = parse(searchParams.get(key) ?? "", schema) as NonUndefined<T>;
  const setValue = (value: NonUndefined<T>) => {
    setSearchParams((prev) => {
      prev.set(key, JSON.stringify(value));
      return prev;
    });
  };

  useDebugValue(value);

  return [value, setValue];
}

export default useParams;
