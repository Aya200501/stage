import { cn } from "@/lib/utils";
import { HTMLMotionProps, motion } from "framer-motion";
import { forwardRef } from "react";

export interface Props extends HTMLMotionProps<"div"> {}
const Card = forwardRef<HTMLDivElement, Props>(
  ({ className, children, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        {...props}
        className={cn(
          "bg-white dark:bg-slate-800 shadow-md shadow-black/5 rounded transition-colors",
          className
        )}
      >
        {children}
      </motion.div>
    );
  }
);

export default Card;
