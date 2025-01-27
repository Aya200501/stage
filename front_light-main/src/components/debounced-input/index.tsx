import { Input, InputProps } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useDebounce } from "../MultipleSelector";

interface DebouncedInputProps extends InputProps {
  delay?: number;
  value: string;
  onValueChange: (value: string) => void;
}
export default function DebouncedInput({
  value,
  delay,
  onValueChange,
  ...props
}: DebouncedInputProps) {
  const [inputValue, setInputValue] = useState(value);

  const debouncedInput = useDebounce(inputValue, delay);

  useEffect(() => {
    onValueChange(debouncedInput);
  }, [debouncedInput]);

  useEffect(() => {
    setInputValue(value);
  }, [value]);
  return (
    <Input
      {...props}
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
    />
  );
}
