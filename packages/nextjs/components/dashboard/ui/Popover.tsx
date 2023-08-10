"use client";

import { ElementRef, forwardRef } from "react";
import { cn } from "@/utils/scaffold-eth/dashboard";
import { Content, PopoverContentProps, Portal, Root, Trigger } from "@radix-ui/react-popover";

export type { PopoverTriggerProps } from "@radix-ui/react-popover";

const Popover = Root;
export const PopoverTrigger = Trigger;

type Content = typeof Content;

export const PopoverContent = forwardRef<ElementRef<Content>, PopoverContentProps>(
  ({ className, align = "center", sideOffset = 4, ...props }, ref) => (
    <Portal>
      <Content
        ref={ref}
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none animate-in data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          className,
        )}
        {...props}
      />
    </Portal>
  ),
);
PopoverContent.displayName = Content.displayName;

export default Popover;
