import { Input } from "@/components/ui/input";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: string;
  label: string;
  name: string;
  placeholder: string;
  defaultValue: string;
}

export const FormInput = ({
  type = "text",
  label,
  placeholder,
  defaultValue,
  name,
  ...props
}: FormInputProps) => {
  return (
    <div className="flex flex-col gap-1.5">
      <span className=" font-medium ">{label}</span>
      <Input
        type={type}
        placeholder={placeholder}
        className="w-full bg-card h-12 px-4 placeholder:text-gray-400 text-white"
        name={name}
        defaultValue={defaultValue}
        {...props}
      />
    </div>
  );
};
