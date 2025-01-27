import * as React from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";

import { cn } from "@/lib/utils";

const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root> & {
    orientation?: "vertical" | "horizontal" | "both";
    scrollareathumbclassName?: string;
    scrollbarclassName?: string;
    scrolAreaContentClassName?: string;
  }
>(
  (
    {
      className,
      children,
      orientation = "vertical",
      scrollareathumbclassName = "",
      scrollbarclassName = "",
      scrolAreaContentClassName = "",
      ...props
    },
    ref
  ) => (
    <ScrollAreaPrimitive.Root
      ref={ref}
      className={cn("relative h-full overflow-hidden", className)}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        className={cn(
          "h-full w-full rounded-[inherit] [&>*]:h-full",
          scrolAreaContentClassName
        )}
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      {(orientation === "vertical" || orientation === "both") && (
        <ScrollBar
          orientation="vertical"
          className={scrollbarclassName}
          scrollareathumbclassName={scrollareathumbclassName}
        />
      )}
      {(orientation === "horizontal" || orientation === "both") && (
        <ScrollBar
          orientation="horizontal"
          className={scrollbarclassName}
          scrollareathumbclassName={scrollareathumbclassName}
        />
      )}
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  )
);
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;

const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<
    typeof ScrollAreaPrimitive.ScrollAreaScrollbar
  > & {
    scrollareathumbclassName?: string;
  }
>(
  (
    {
      className,
      orientation = "vertical",
      scrollareathumbclassName = "",
      ...props
    },
    ref
  ) => (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      ref={ref}
      orientation={orientation}
      className={cn(
        "flex touch-none select-none transition-colors",
        orientation === "vertical" &&
          "h-full w-2.5 border-l border-l-transparent p-[1px]",
        orientation === "horizontal" &&
          "h-2.5 flex-col border-t border-t-transparent p-[1px]",
        className
      )}
      {...props}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb
        className={cn(
          "relative flex-1 rounded-full bg-current",
          scrollareathumbclassName
        )}
      />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  )
);
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;

export { ScrollArea, ScrollBar };
