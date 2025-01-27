import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

interface StatusButtonProps {
  value: string;
  label: string;
  color: string;
  icon: LucideIcon;
  handler: (status: string) => void;
  className?: string;
}

export const StatusButton = ({
  value,
  label,
  color,
  icon: Icon,
  handler,
  className = "",
}: StatusButtonProps) => {
  const { t } = useTranslation();
  return (
    <Button
      className={cn(
        "flex h-10 items-center gap-4 rounded-lg bg-muted px-3.5 text-xs font-bold text-muted-foreground hover:bg-muted hover:brightness-95 dark:hover:brightness-125 transition-colors duration-0 capitalize",
        className
      )}
      onClick={() => handler(value)}
    >
      <Icon className="size-3 stroke-[0.25rem]" color={color} />
      {t(label)}
    </Button>
  );
};
