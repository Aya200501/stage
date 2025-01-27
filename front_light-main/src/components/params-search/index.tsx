"use client";
import { cn } from "@/lib/utils";
import { SearchIcon } from "lucide-react";
import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Input } from "../ui/input";
import { useTranslation } from "react-i18next";

interface ParamsSearchProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  delay?: number;
  placeholder?: string;
  resetPagination?: boolean;
}

export default function ParamsSearch({
  className,
  placeholder = "search",
  delay = 500,
  resetPagination = false,
  ...props
}: ParamsSearchProps) {
  const [searchParams, setSearchParams] = useSearchParams({
    page: "1",
    perPage: "10",
    search: "",
  });
  const { t } = useTranslation();
  const search = searchParams.get("search") ?? "";
  const [value, setValue] = React.useState(search);
  const firstRender = React.useRef(new Date().getTime());

  useEffect(() => {
    setValue(search);
  }, [search]);

  React.useEffect(() => {
    if (new Date().getTime() - firstRender.current < delay || value === search)
      return;

    const timer = setTimeout(() => {
      setSearchParams((prev) => {
        prev.set("search", value);
        if (resetPagination) {
          prev.set("page", "1");
          prev.set("perPage", "10");
        }
        return prev;
      });
    }, delay);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, delay]);

  return (
    <div className={cn("relative  w-56", className)} {...props}>
      <Input
        type="text"
        className="pl-10  py-2 first-letter:uppercase"
        placeholder={t(placeholder)}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <SearchIcon
        size={18}
        className="text-foreground/50 peer-focus:text-primary absolute top-1/2 left-3 transform -translate-y-1/2 pointer-events-none"
      />
    </div>
  );
}
