"use client";
import { Button } from "@/components/ui/button";
import { useContractStore } from "@/context/store";
import { Eraser } from "lucide-react";

export function Log() {
  const { logItems, clearLog } = useContractStore();

  const handleClearLog = () => {
    clearLog();
  };

  return (
    <div className="grid gap-4 h-full">
      <div className="rounded-md bg-black p-6 space-y-5">
        <div className="w-full justify-end  flex">
          <Button onClick={handleClearLog} className="gap-5" variant="outline">
            <Eraser className="h-4 w-4" /> Clear logs
          </Button>
        </div>

        <pre>
          <code className="grid gap-1 text-sm text-muted-foreground">
            {logItems.map((item, index) => (
              <span key={index}>
                <span
                  className={
                    item.type === "JSON"
                      ? "text-amber-300 text-wrap"
                      : "text-sky-300 text-wrap"
                  }
                >
                  {item.message}
                </span>
              </span>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}
