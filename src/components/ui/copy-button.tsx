"use client";
import { Event } from "@/lib/events";
import { cn } from "@/lib/utils";
import { CheckIcon, ClipboardIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Button, ButtonProps } from "./button";

interface CopyButtonProps extends ButtonProps {
  value: string;
  src?: string;
  event?: Event["name"];
}
export async function copyToClipboardWithMeta(value: string, event?: Event) {
  navigator.clipboard.writeText(value);
}
export function CopyButton({
  value,
  className,
  src,
  variant = "outline",
  event,
  ...props
}: CopyButtonProps) {
  const [hasCopied, setHasCopied] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  }, [hasCopied]);

  return (
    <Button
      size="icon"
      variant={variant}
      className={cn(
        "relative z-10 h-6 w-6 text-zinc-50 hover:bg-zinc-700 hover:text-zinc-50 [&_svg]:size-3",
        className
      )}
      onClick={() => {
        copyToClipboardWithMeta(
          value,
          event
            ? {
                name: event,
                properties: {
                  code: value,
                },
              }
            : undefined
        );
        setHasCopied(true);
      }}
      {...props}
    >
      <span className="sr-only">Copy</span>
      {hasCopied ? <CheckIcon /> : <ClipboardIcon />}
    </Button>
  );
}
