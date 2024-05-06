import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { TerminalIcon } from "lucide-react";
import { Log } from ".";

export default function SheetLogs() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="rounded-full">
          <TerminalIcon />
        </Button>
      </SheetTrigger>
      <SheetContent side={"bottom"} className="w-full h-5/6">
        <Log />
      </SheetContent>
    </Sheet>
  );
}
